package se.salt.echoboard.service;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
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
import java.util.Set;

@Service
@AllArgsConstructor
public class EchoBoardService {

    private final EchoBoardRepository echoBoardRepository;

    private final EchoBoardCommentRepository commentRepository;

    private final EchoBoardSolutionRepository solutionRepository;

    private final EchoBoardUserRepository userRepository;


    @Transactional
    public EchoBoard saveEcho(EchoBoard echoBoard, String userSubject) {
        var user = userRepository.getUserBySubject(userSubject);
        echoBoard.setUser(user.orElseThrow());
        return echoBoardRepository.save(echoBoard);
    }

    @Transactional
    public Optional<EchoBoardComment> saveComment(EchoBoardComment comment, String userSubject) {
        return userRepository.getUserBySubject(userSubject)
                .map(comment::setEchoBoardUser).map(commentRepository::save);
    }

    @Transactional
    public Optional<EchoBoardSolution> saveSolution(EchoBoardSolution solution, String userSubject) {
        return userRepository.getUserBySubject(userSubject)
                .map(solution::setEchoBoardUser).map(solutionRepository::save);
    }

    @Transactional
    public EchoBoardSolution updateSolution(EchoBoardSolution solution) {
        return solutionRepository.save(solution);
    }

    @Transactional
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

    @Transactional
    public Optional<Long> addCommentToEcho(long echoBoardId, EchoBoardComment echoBoardComment, String userSubject) {
        Optional<EchoBoard> echoBoard = getEchoById(echoBoardId);

        return echoBoard.flatMap(e -> {
            e.addComment(echoBoardComment);
            return saveComment(echoBoardComment, userSubject).map(EchoBoardComment::getId);
        });
    }

    @Transactional
    public Optional<Long> addSolutionToEcho(long echoBoardId, EchoBoardSolution echoBoardSolution, String userSubject) {
        Optional<EchoBoard> echoBoard = getEchoById(echoBoardId);
        return echoBoard.flatMap(e -> {
            e.addSolution(echoBoardSolution);
            return saveSolution(echoBoardSolution, userSubject);
        }).map(EchoBoardSolution::getId);
    }

    @Transactional
    public Optional<Integer> upvoteComment(long commentId, String userSubject) {
        return getCommentById(commentId)
                .map(comment -> comment.addUpvote(userSubject))
                .map(this::updateComment)
                .map(EchoBoardComment::getUpvote)
                .map(Set::size);
    }

    @Transactional
    public Optional<Integer> upvoteEcho(long echoId, String userSubject) {
        return getEchoById(echoId)
                .map(echoBoard -> echoBoard.addUpvote(userSubject))
                .map(echoBoardRepository::save)
                .map(EchoBoard::getUpvote)
                .map(Set::size);
    }

    @Transactional
    public Optional<Integer> upvoteSolution(long solutionId, String userSubject) {
        return getSolutionById(solutionId)
                .map(solution -> solution.addUpvote(userSubject))
                .map(this::updateSolution)
                .map(EchoBoardSolution::getUpvote)
                .map(Set::size);
    }

    @Transactional
    public void deleteEcho(Long id) {
        echoBoardRepository.deleteById(id);
    }

    public Optional<EchoBoardUser> getUserBySubject(String id) {
        return userRepository.getUserBySubject(id);
    }

    @Transactional
    public Optional<Long> addCommentToComment(long commentId,
                                              EchoBoardComment echoBoardComment,
                                              String userSubject) {
        return getCommentById(commentId).flatMap(c -> {
            c.addCommentToEchoBoardComment(echoBoardComment);
            return saveComment(echoBoardComment, userSubject).map(EchoBoardComment::getId);
        });
    }

    public  Optional<EchoBoardSolution.SolutionStatus> getSolutionStatus(long solutionId){
        return getSolutionById(solutionId)
                .map(EchoBoardSolution::getStatus);
    }

    @Transactional
    public Optional<EchoBoardSolution> addVolunteerToSolution(long solutionId,
                                                              OidcUser user){
        var volunteer = getUserBySubject(user.getSubject()).orElseThrow();
        return  getSolutionById(solutionId)
                .map(solution -> solution.addVolunteer(volunteer))
                .map(this::updateSolution);
    }
}
