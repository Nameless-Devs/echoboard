package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponseDto;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.EchoBoardService;


@RestController
@AllArgsConstructor
@RequestMapping("api/solutions")
public class SolutionController {

    private final EchoBoardService echoService;
    private final DTOConvertor convertor;

    @GetMapping("{echoBoardSolutionId}")
    public ResponseEntity<EchoBoardSolutionResponseDto> getEchoBoardSolution(@PathVariable long echoBoardSolutionId) {
        return ResponseEntity.of(echoService.getSolutionById(echoBoardSolutionId)
                .map(convertor::convertEntityToResponseDto));
    }


    @PatchMapping("{echoBoardSolutionId}")
    public ResponseEntity<EchoBoardSolutionResponseDto> updateSolutionStatus(@PathVariable long echoBoardSolutionId
            , @RequestParam EchoBoardSolution.SolutionStatus updateToStage) {

        var echoBoardSolution = echoService.getSolutionById(echoBoardSolutionId)
                .map(solution -> solution.updateSolutionStatus(updateToStage))
                .map(echoService::updateSolution);

        return ResponseEntity.of(echoBoardSolution.map(convertor::convertEntityToResponseDto));
    }

    @PatchMapping("solutions/{solutionId}/upvote")
    public ResponseEntity<Integer> upvoteSolution(@PathVariable long solutionId, @AuthenticationPrincipal OidcUser user) {
        return ResponseEntity.of(echoService.upvoteSolution(solutionId, user.getSubject()));
    }
}
