package se.salt.echoboard.service.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class EchoBoardSolutionRepository {

    private final JPAEchoBoardSolutionRepository solutionRepository;

    public EchoBoardSolution save(EchoBoardSolution echoBoardSolution) {
        return solutionRepository.save(echoBoardSolution);
    }

    public Optional<EchoBoardSolution> getSolutionById(long solutionId) {
        return solutionRepository.findById(solutionId);
    }

    public List<EchoBoardSolution> findByEchoBoardUser(EchoBoardUser user) {
        return solutionRepository.findByEchoBoardUser(user);
    }
}
