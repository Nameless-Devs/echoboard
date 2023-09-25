package se.salt.echoboard.service.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import se.salt.echoboard.model.EchoBoardSolution;

@Repository
@AllArgsConstructor
public class EchoBoardSolutionRepository {

    private final JPAEchoBoardSolutionRepository solutionRepository;

    public EchoBoardSolution saveSolution(EchoBoardSolution echoBoardSolution) {
        return solutionRepository.save(echoBoardSolution);
    }
}
