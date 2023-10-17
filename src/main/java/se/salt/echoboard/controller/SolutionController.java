package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponse;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.EchoBoardService;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping("api/v1/solutions")
@RequiredArgsConstructor
public class SolutionController {

    private final EchoBoardService echoService;

    @GetMapping("{solutionId}")
    @ResponseStatus(OK)
    public EchoBoardSolution getEchoBoardSolution(@PathVariable long solutionId) {
        return echoService.getSolutionById(solutionId);
    }

    @PatchMapping("{solutionId}")
    @ResponseStatus(OK)
    public EchoBoardSolutionResponse updateSolutionStatus(@PathVariable long solutionId
            , @RequestParam EchoBoardSolution.SolutionStatus updateToStage) {

        return echoService.updateSolutionStatus(solutionId, updateToStage);
    }

    @PatchMapping("{solutionId}/upvote")
    @ResponseStatus(OK)
    public Integer upvoteSolution(@PathVariable long solutionId, @AuthenticationPrincipal OidcUser user) {
        return echoService.upvoteSolution(solutionId, user.getSubject());
    }

    @PostMapping("{solutionId}/volunteer")
    @ResponseStatus(CREATED)
    public EchoBoardSolutionResponse volunteerForSolutionTesting(@PathVariable long solutionId
            , @AuthenticationPrincipal OidcUser user) {
        return echoService.addVolunteerToSolution(solutionId, user);
    }
}
