package se.salt.echoboard.service;

import se.salt.echoboard.model.EchoBoard;
import org.springframework.stereotype.Repository;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class EchoBoardRepository {

    private final JPAEchoBoardRepository echoBoardRepository;

    public EchoBoardRepository(JPAEchoBoardRepository echoBoardRepository){
        this.echoBoardRepository = echoBoardRepository;
    }

    public EchoBoard save(EchoBoard echoBoard) {
        echoBoardRepository.save(echoBoard);
        return echoBoard;
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

    public Long saveCommentToPost(Optional<EchoBoard> echoBoard, EchoBoardComment echoBoardComment) {
        return echoBoard.map(board -> {
            board.getEchoBoardComments().add(echoBoardComment);
            echoBoardRepository.save(board);
            return echoBoard.get().getEchoBoardComments()
                    .stream()
                    .filter(comment ->
                            comment.getAuthor().equals(echoBoardComment.getAuthor())
                                    && comment.getCreated().equals(echoBoardComment.getCreated()))
                    .findFirst().get().getId();
        }).orElse(null);
    }

    public Long saveSolutionToPost(Optional<EchoBoard> echoBoard, EchoBoardSolution echoBoardSolution) {
        return echoBoard.map(board -> {
            board.getEchoBoardSolutions().add(echoBoardSolution);
            echoBoardRepository.save(board);
            return echoBoard.get().getEchoBoardSolutions()
                    .stream()
                    .filter(solution ->
                            solution.getAuthor().equals(echoBoardSolution.getAuthor())
                                    && solution.getCreated().equals(echoBoardSolution.getCreated()))
                    .findFirst().get().getId();
        }).orElse(null);
    }
}
