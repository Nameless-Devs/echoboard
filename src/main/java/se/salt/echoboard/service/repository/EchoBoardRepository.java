package se.salt.echoboard.service.repository;

import lombok.AllArgsConstructor;
import se.salt.echoboard.model.EchoBoard;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class EchoBoardRepository {

    private final JPAEchoBoardRepository echoBoardRepository;

    public EchoBoard save(EchoBoard echoBoard) {
        return echoBoardRepository.save(echoBoard);
    }

    public Optional<EchoBoard> getEchoById(long id) {
        return echoBoardRepository.findById(id);
    }

    public List<EchoBoard> findAll() {
        return echoBoardRepository.findAll();
    }

    public void deleteEcho(EchoBoard echo) {
        echoBoardRepository.delete(echo);
    }

    public Optional<Long> addCommentToPost(Optional<EchoBoard> echoBoard, EchoBoardComment echoBoardComment) {
         return echoBoard.map(board -> {
            board.getEchoBoardComment().add(echoBoardComment);
             return commentRepository.saveComment(echoBoardComment).getId();
        });
    }

    public Optional<Long> addSolutionToPost(Optional<EchoBoard> echoBoard, EchoBoardSolution echoBoardSolution) {
        return echoBoard.map(board -> {
            board.getEchoBoardSolutions().add(echoBoardSolution);
            return solutionRepository.saveSolution(echoBoardSolution).getId();
        });
    }
}
