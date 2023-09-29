package se.salt.echoboard.service;


import lombok.AllArgsConstructor;
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
        return commentRepository.save(comment);
    }

    public EchoBoardSolution saveSolution(EchoBoardSolution solution) {
        return solutionRepository.save(solution);
    }


    public Optional<EchoBoard> getEchoById(Long id) {
        return echoBoardRepository.getEchoById(id);
    }

    public List<EchoBoard> findAll() {
        return echoBoardRepository.findByOrderByCreatedDesc(Pageable.unpaged());
    }

    public Optional<EchoBoardComment> getCommentById(long commentId) {
        return commentRepository.getCommentById(commentId);
    }


    public Optional<EchoBoardSolution> getSolutionById(long solutionId) {
        return solutionRepository.getSolutionById(solutionId);
    }

    public Optional<Long> addCommentToEcho(long echoBoardId, EchoBoardComment echoBoardComment) {
        Optional<EchoBoard> echoBoard = getEchoById(echoBoardId);
        return echoBoard.map(board -> {
            board.getEchoBoardComment().add(echoBoardComment);
            return saveComment(echoBoardComment).getId();
        });
    }

    public Optional<Long> addSolutionToEcho(long echoBoardId, EchoBoardSolution echoBoardSolution) {
        Optional<EchoBoard> echoBoard = getEchoById(echoBoardId);
        return echoBoard.map(board -> {
            board.getEchoBoardSolutions().add(echoBoardSolution);
            return saveSolution(echoBoardSolution).getId();
        });
    }

    public Optional<Integer> upvoteComment (long commentId) {
        return getCommentById(commentId)
                .map(EchoBoardComment::addUpvote)
                .map(this::saveComment)
                .map(EchoBoardComment::getUpvote);
    }

    public Optional<Integer> upvoteEcho(long echoId) {
        return getEchoById(echoId)
                .map(EchoBoard::addUpvote)
                .map(echoBoardRepository::save)
                .map(EchoBoard::getUpvote);
    }

    public Optional<Integer> upvoteSolution(long solutionId) {
        return getSolutionById(solutionId)
                .map(EchoBoardSolution::addUpvote)
                .map(this::saveSolution)
                .map(EchoBoardSolution::getUpvote);
    }

    public void deleteEcho(Long id) {
        echoBoardRepository.deleteById(id);
    }

}
