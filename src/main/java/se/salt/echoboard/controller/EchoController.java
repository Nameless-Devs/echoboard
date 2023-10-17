package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardCommentResponseDTO;
import se.salt.echoboard.controller.dto.EchoBoardResponseDTO;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponseDTO;
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

    @GetMapping("{echoId}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<EchoBoardResponseDTO> getEcho(@PathVariable long echoId) {
        return echoService.getEchoById(echoId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<EchoBoardResponseDTO> getAllEchoes() {
        return echoService.findAll();
    }

    @PatchMapping("{echoId}/upvote")
    @ResponseStatus(HttpStatus.OK)
    public Optional<Integer> upvoteEcho(@PathVariable long echoId, @AuthenticationPrincipal OidcUser user) {
        return echoService.upvoteEcho(echoId, user.getSubject()).map(Set::size);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<EchoBoardResponseDTO> saveEcho(@RequestBody EchoBoard echoBoard, @AuthenticationPrincipal OidcUser user) {
        return echoService.saveEcho(echoBoard, user.getSubject());
    }

    @PostMapping("{echoId}/solutions")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<EchoBoardSolutionResponseDTO> addSolutionToEchoBoard(@PathVariable long echoId,
                                                                         @RequestBody EchoBoardSolution echoBoardSolution,
                                                                         @AuthenticationPrincipal OidcUser user) {
        return echoService.addSolutionToEcho(echoId, echoBoardSolution, user.getSubject());
    }

    @PostMapping("{echoId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<EchoBoardCommentResponseDTO> addCommentToEchoBoard(@PathVariable long echoId,
                                                                       @RequestBody EchoBoardComment echoBoardComment,
                                                                       @AuthenticationPrincipal OidcUser user) {
        return echoService.addCommentToEcho(echoId, echoBoardComment, user.getSubject());
    }

    @DeleteMapping("{echoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Optional<EchoBoardResponseDTO> deleteEcho(@PathVariable long echoId) {
        echoService.deleteEcho(echoId);
        return echoService.getEchoById(echoId);
    }
}

