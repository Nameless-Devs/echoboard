package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.EchoBoardCommentResponseDTO;
import se.salt.echoboard.controller.dto.EchoBoardResponseDTO;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponseDTO;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.EchoBoardService;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("api/v1/echoes")
@RequiredArgsConstructor
public class EchoController {

    private final EchoBoardService echoService;

    @GetMapping("{echoId}")
    @ResponseStatus(OK)
    public EchoBoardResponseDTO getEcho(@PathVariable long echoId) {
        return echoService.getEchoById(echoId);
    }

    @GetMapping
    @ResponseStatus(OK)
    public List<EchoBoardResponseDTO> getAllEchoes() {
        return echoService.findAll();
    }

    @PatchMapping("{echoId}/upvote")
    @ResponseStatus(OK)
    public Integer upvoteEcho(@PathVariable long echoId, @AuthenticationPrincipal OidcUser user) {
        return echoService.upvoteEcho(echoId, user.getSubject());
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public EchoBoardResponseDTO saveEcho(@RequestBody EchoBoard echoBoard, @AuthenticationPrincipal OidcUser user) {
        return echoService.saveEcho(echoBoard, user.getSubject());
    }

    @PostMapping("{echoId}/solutions")
    @ResponseStatus(CREATED)
    public EchoBoardSolutionResponseDTO addSolutionToEchoBoard(@PathVariable long echoId,
                                                                         @RequestBody EchoBoardSolution echoBoardSolution,
                                                                         @AuthenticationPrincipal OidcUser user) {
        return echoService.addSolutionToEcho(echoId, echoBoardSolution, user.getSubject());
    }

    @PostMapping("{echoId}/comments")
    @ResponseStatus(CREATED)
    public EchoBoardCommentResponseDTO addCommentToEchoBoard(@PathVariable long echoId,
                                                                       @RequestBody EchoBoardComment echoBoardComment,
                                                                       @AuthenticationPrincipal OidcUser user) {
        return echoService.addCommentToEcho(echoId, echoBoardComment, user.getSubject());
    }

    @DeleteMapping("{echoId}")
    @ResponseStatus(NO_CONTENT)
    public EchoBoardResponseDTO deleteEcho(@PathVariable long echoId) {
        echoService.deleteEcho(echoId);
        return echoService.getEchoById(echoId);
    }
}

