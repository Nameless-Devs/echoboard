package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponseDTO;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.EchoBoardService;

import java.util.Optional;


@RestController
@AllArgsConstructor
@RequestMapping("api/solutions")
public class SolutionController {

    private final EchoBoardService echoService;

    @GetMapping("{solutionId}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<EchoBoardSolution> getEchoBoardSolution(@PathVariable long solutionId) {
        return echoService.getSolutionById(solutionId);
    }

    @PatchMapping("{solutionId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Optional<EchoBoardSolutionResponseDTO> updateSolutionStatus(@PathVariable long solutionId
            , @RequestParam EchoBoardSolution.SolutionStatus updateToStage) {

        return echoService.updateSolutionStatus(solutionId, updateToStage);
    }

    @PatchMapping("{solutionId}/upvote")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<Integer> upvoteSolution(@PathVariable long solutionId, @AuthenticationPrincipal OidcUser user) {
        return ResponseEntity.of(echoService.upvoteSolution(solutionId, user.getSubject()));
    }

    @PostMapping("{solutionId}/volunteer")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<EchoBoardSolutionResponseDTO> volunteerForSolutionTesting(@PathVariable long solutionId
            , @AuthenticationPrincipal OidcUser user) {
        return ResponseEntity.of(echoService.addVolunteerToSolution(solutionId, user));
    }
}
