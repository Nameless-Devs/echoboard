package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.EchoBoardPreview;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponse;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.SolutionService;

import java.util.Set;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping("api/v1/solutions")
@RequiredArgsConstructor
public class SolutionController {

    private final SolutionService solutionService;

    @GetMapping("{solutionId}")
    @ResponseStatus(OK)
    public EchoBoardSolutionResponse getEchoBoardSolution(@PathVariable long solutionId) {
        return solutionService.getSolutionById(solutionId);
    }

    @PatchMapping("{solutionId}")
    @ResponseStatus(OK)
    public EchoBoardSolutionResponse updateSolutionStatus(@PathVariable long solutionId
            , @RequestParam EchoBoardSolution.SolutionStatus updateToStage) {

        return solutionService.updateSolutionStatus(solutionId, updateToStage);
    }

    @PatchMapping("{solutionId}/upvote")
    @ResponseStatus(OK)
    public Integer upvoteSolution(@PathVariable long solutionId, @AuthenticationPrincipal OidcUser user) {
        return solutionService.upvoteSolution(solutionId, user.getSubject());
    }

    @GetMapping("{solutionId}/volunteer")
    @ResponseStatus(OK)
    public Set<EchoBoardUser> getPendingVolunteers(@PathVariable long solutionId) {
        return solutionService.getPendingVolunteers(solutionId);
    }

    @PostMapping("{solutionId}/volunteer")
    @ResponseStatus(CREATED)
    public EchoBoardSolutionResponse addPendingVolunteerToSolution(@PathVariable long solutionId,
                                                                   @AuthenticationPrincipal OidcUser user) {
        return solutionService.addPendingVolunteerToSolution(solutionId, user);
    }

    @PatchMapping("{solutionId}/volunteer")
    @ResponseStatus(CREATED)
    public EchoBoardSolutionResponse confirmVolunteerForSolution(@PathVariable long solutionId,
                                                                 @AuthenticationPrincipal OidcUser user,
                                                                 @RequestBody String volunteerId) {
        return solutionService.addVolunteerToSolution(solutionId, user , volunteerId);
    }

    @GetMapping("/{solutionId}/echoboard")
    @ResponseStatus(OK)
    public EchoBoardPreview getEchoBoardBySolutionId(@PathVariable long solutionId){
        return solutionService.getEchoBoardBySolutionId(solutionId);
    }

}
