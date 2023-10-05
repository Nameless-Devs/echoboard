package se.salt.echoboard.service;


import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.repository.EchoBoardCommentRepository;
import se.salt.echoboard.service.repository.EchoBoardRepository;
import se.salt.echoboard.service.repository.EchoBoardSolutionRepository;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EchoBoardService {

    private final EchoBoardRepository echoBoardRepository;

    private final EchoBoardCommentRepository commentRepository;

    private final EchoBoardSolutionRepository solutionRepository;

    private final EchoBoardUserRepository userRepository;


    public EchoBoard saveEcho(EchoBoard echoBoard, String userSubject) {
        var user = userRepository.getUserBySubject(userSubject);
        user.map(u -> u.addUserPost(echoBoard));
        return echoBoardRepository.save(echoBoard);
    }

    public EchoBoardComment saveComment(EchoBoardComment comment, String userSubject) {
        var user = userRepository.getUserBySubject(userSubject);
        user.map(u -> u.addUserComment(comment));
        return commentRepository.save(comment);
    }

    public EchoBoardSolution saveSolution(EchoBoardSolution solution, String userSubject) {
        var user = userRepository.getUserBySubject(userSubject);
        user.map(u -> u.addUserSolution(solution));
        return solutionRepository.save(solution);
    }

    public EchoBoardSolution updateSolution(EchoBoardSolution solution) {
        return solutionRepository.save(solution);
    }

    public EchoBoardComment updateComment(EchoBoardComment comment) {
        return commentRepository.save(comment);
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

    public Optional<Long> addCommentToEcho(long echoBoardId, EchoBoardComment echoBoardComment, String userSubject) {
        Optional<EchoBoard> echoBoard = getEchoById(echoBoardId);
        return echoBoard.map(board -> {
            board.getEchoBoardComment().add(echoBoardComment);
            return saveComment(echoBoardComment, userSubject).getId();
        });
    }

    public Optional<Long> addSolutionToEcho(long echoBoardId, EchoBoardSolution echoBoardSolution, String userSubject) {
        Optional<EchoBoard> echoBoard = getEchoById(echoBoardId);
        return echoBoard.map(board -> {
            board.getEchoBoardSolutions().add(echoBoardSolution);
            return saveSolution(echoBoardSolution, userSubject).getId();
        });
    }

    public Optional<Integer> upvoteComment(long commentId) {
        return getCommentById(commentId)
                .map(EchoBoardComment::addUpvote)
                .map(this::updateComment)
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
                .map(this::updateSolution)
                .map(EchoBoardSolution::getUpvote);
    }

    public void deleteEcho(Long id) {
        echoBoardRepository.deleteById(id);
    }

    public Optional<EchoBoardUser> getUserById(String id) {
        return userRepository.getUserBySubject(id);
    }
}
