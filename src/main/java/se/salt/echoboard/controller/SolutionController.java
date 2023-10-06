package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<EchoBoardSolution> getEchoBoardSolution(@PathVariable long echoBoardSolutionId) {
        return ResponseEntity.of(echoService.getSolutionById(echoBoardSolutionId));
    }

    @PatchMapping("{echoBoardSolutionId}")
    public ResponseEntity<EchoBoardSolutionResponseDto> updateSolutionStatus(@PathVariable long echoBoardSolutionId
            , @RequestParam EchoBoardSolution.SolutionStatus updateToStage) {

        var echoBoardSolution = echoService.getSolutionById(echoBoardSolutionId)
                .map(solution -> solution.updateSolutionStatus(updateToStage))
                .map(echoService::updateSolution);

        return ResponseEntity.of(echoBoardSolution.map(convertor::convertEntityToResponseDto));
    }
}
