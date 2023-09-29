package se.salt.echoboard.service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.EchoBoardSolution;

public interface JPAEchoBoardSolutionRepository extends JpaRepository<EchoBoardSolution, Long> {
}
