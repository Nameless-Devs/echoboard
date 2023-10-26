package se.salt.echoboard.service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;

import java.util.List;

public interface JPAEchoBoardSolutionRepository extends JpaRepository<EchoBoardSolution, Long> {
    List<EchoBoardSolution> findByEchoBoardUser(EchoBoardUser user);
}
