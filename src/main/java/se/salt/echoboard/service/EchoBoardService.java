package se.salt.echoboard.service;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import se.salt.echoboard.model.EchoBoard;
import org.springframework.stereotype.Service;
import java.util.List;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.repository.EchoBoardCommentRepository;
import se.salt.echoboard.service.repository.EchoBoardRepository;
import se.salt.echoboard.service.repository.EchoBoardSolutionRepository;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EchoBoardService {

    private final EchoBoardRepository echoBoardRepository;

    private final EchoBoardCommentRepository commentRepository;

    private final EchoBoardSolutionRepository solutionRepository;


    public EchoBoard saveEcho(EchoBoard echoBoard) {
        return echoBoardRepository.save(echoBoard);
    }

    public EchoBoardComment saveComment(EchoBoardComment comment) {
        return commentRepository.saveComment(comment);
    }

    public Optional<EchoBoard> getEchoById(Long id) {
        return echoBoardRepository.getEchoById(id);
    }

    public List<EchoBoard> findAll() {
        return echoBoardRepository.findAll();
    }

    public Optional<EchoBoardComment> findCommentById(long commentId) {
        return commentRepository.findCommentById(commentId);
    }

    public Optional<Long> addCommentToEcho(Optional<EchoBoard> echoBoard, EchoBoardComment echoBoardComment) {
        return echoBoard.map(board -> {
            board.getEchoBoardComment().add(echoBoardComment);
            return commentRepository.saveComment(echoBoardComment).getId();
        });
    }

    public Optional<Long> addSolutionToEcho(Optional<EchoBoard> echoBoard, EchoBoardSolution echoBoardSolution) {
        return echoBoard.map(board -> {
            board.getEchoBoardSolutions().add(echoBoardSolution);
            return solutionRepository.saveSolution(echoBoardSolution).getId();
        });
    }

    public Optional<Integer> upvoteComment (long commentId) {
        var comment = findCommentById(commentId);
        comment.map(EchoBoardComment::addUpvote);
        comment.map(this::saveComment);
        return comment.map(EchoBoardComment::getUpvote);
    }

//    public void deleteEcho(Long id) {
//        echoBoardRepository.deleteById(id);
//    }

}
