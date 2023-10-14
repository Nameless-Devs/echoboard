package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardCommentResponseDto;
import se.salt.echoboard.controller.dto.EchoBoardResponseDto;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponseDto;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.EchoBoardService;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("api/echoes")
@AllArgsConstructor
public class EchoController {

    private final EchoBoardService echoService;
    private final DTOConvertor convertor;

    @GetMapping("{echoId}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<EchoBoardResponseDto> getEcho(@PathVariable long echoId) {
        return echoService.getEchoById(echoId)
                .map(convertor::convertEntityToResponseDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<EchoBoardResponseDto> getAllEchoes() {
        return echoService.findAll().stream()
                .map(convertor::convertEntityToResponseDto).toList();
    }

    @PatchMapping("{echoId}/upvote")
    @ResponseStatus(HttpStatus.OK)
    public Optional<Integer> upvoteEcho(@PathVariable long echoId, @AuthenticationPrincipal OidcUser user) {
        return echoService.upvoteEcho(echoId, user.getSubject()).map(Set::size);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<EchoBoardResponseDto> saveEcho(@RequestBody EchoBoard echoBoard, @AuthenticationPrincipal OidcUser user) {
        return echoService.saveEcho(echoBoard, user.getSubject())
                .map(convertor::convertEntityToResponseDto);
    }

    @PostMapping("{echoId}/solutions")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<EchoBoardSolutionResponseDto> addSolutionToEchoBoard(@PathVariable long echoId,
                                                                         @RequestBody EchoBoardSolution echoBoardSolution,
                                                                         @AuthenticationPrincipal OidcUser user) {
        return echoService.addSolutionToEcho(echoId, echoBoardSolution, user.getSubject())
                .map(convertor::convertEntityToResponseDto);
    }

    @PostMapping("{echoId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<EchoBoardCommentResponseDto> addCommentToEchoBoard(@PathVariable long echoId,
                                                                       @RequestBody EchoBoardComment echoBoardComment,
                                                                       @AuthenticationPrincipal OidcUser user) {
        return echoService.addCommentToEcho(echoId, echoBoardComment, user.getSubject())
                .map(convertor::convertEntityToResponseDto);
    }

    @DeleteMapping("{echoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Optional<EchoBoard> deleteEcho(@PathVariable long echoId) {
        echoService.deleteEcho(echoId);
        return echoService.getEchoById(echoId);
    }
}

