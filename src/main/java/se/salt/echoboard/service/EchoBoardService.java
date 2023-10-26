package se.salt.echoboard.service;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import se.salt.echoboard.controller.dto.*;
import se.salt.echoboard.exception.custom.*;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.repository.EchoBoardCommentRepository;
import se.salt.echoboard.service.repository.EchoBoardRepository;
import se.salt.echoboard.service.repository.EchoBoardSolutionRepository;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.util.ArrayList;
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

    private final DTOConvertor convertor;


    public EchoBoardResponse saveEcho(EchoBoard echoBoard, String userSubject) {
        return userRepository.getUserBySubject(userSubject)
                .map(echoBoard::setUser)
                .map(echoBoardRepository::save)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(UserNotFoundException::new);
    }

    private EchoBoardComment updateComment(EchoBoardComment comment) {
        return commentRepository.save(comment);
    }

    public EchoBoardResponse getEchoById(long id) {
        return echoBoardRepository.getEchoById(id)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(() -> new EchoBoardNotFoundException(id));
    }

    public List<EchoBoardResponse> findAll() {
        return echoBoardRepository.findByOrderByCreatedDesc(Pageable.unpaged())
                .stream().map(convertor::convertEntityToResponseDTO)
                .toList();
    }

    public EchoBoardCommentResponse getCommentById(long commentId) {
        return commentRepository.getCommentById(commentId)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(() -> new CommentNotFoundException(commentId));
    }

    public EchoBoardSolution getSolutionById(long solutionId) {
        return solutionRepository.getSolutionById(solutionId)
                .orElseThrow(() -> new SolutionNotFoundException(solutionId));
    }

    public EchoBoardCommentResponse addCommentToEcho(long echoBoardId, EchoBoardComment echoBoardComment, String userSubject) {
        return echoBoardRepository.getEchoById(echoBoardId).map(e -> {
                    e.addComment(echoBoardComment);
                    return saveComment(echoBoardComment, userSubject);
                })
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(EchoBoardNotFoundException::new);
    }

    public EchoBoardSolutionResponse addSolutionToEcho(long echoBoardId, EchoBoardSolution echoBoardSolution, String userSubject) {

        return echoBoardRepository.getEchoById(echoBoardId).map(e -> {
                    e.addSolution(echoBoardSolution);
                    return saveSolution(echoBoardSolution, userSubject);
                })
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(EchoBoardNotFoundException::new);
    }

    public Integer upvoteComment(long commentId, String userSubject) {
        return commentRepository.getCommentById(commentId)
                .map(comment -> comment.addUpvote(userSubject))
                .map(this::updateComment)
                .map(EchoBoardComment::getUpvote)
                .map(Set::size)
                .orElseThrow(CommentNotFoundException::new);
    }

    public Integer upvoteEcho(long echoId, String userSubject) {
        return echoBoardRepository.getEchoById(echoId)
                .map(echoBoard -> echoBoard.addUpvote(userSubject))
                .map(echoBoardRepository::save)
                .map(EchoBoard::getUpvote)
                .map(Set::size)
                .orElseThrow(EchoBoardNotFoundException::new);
    }

    public Integer upvoteSolution(long solutionId, String userSubject) {
        return solutionRepository.getSolutionById(solutionId)
                .map(solution -> solution.addUpvote(userSubject))
                .map(this::updateSolution)
                .map(EchoBoardSolution::getUpvote)
                .map(Set::size)
                .orElseThrow(SolutionNotFoundException::new);
    }

    public void deleteEcho(Long id) {
        echoBoardRepository.deleteById(id);
    }

    public EchoBoardUserResponse getUserBySubject(String id) {
        return userRepository.getUserBySubject(id)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(UserNotFoundException::new);
    }

    public EchoBoardUserInfo getEchoBoardUserWithCommentsAndSolutions(String subject) {
        return userRepository.getUserBySubject(subject)
                .map(convertor::convertEntityToEchoBoardUserWithInfoDTO)
                .orElseThrow(UserNotFoundException::new);
    }

    public EchoBoardCommentResponse addCommentToComment(long commentId,
                                                        EchoBoardComment echoBoardComment,
                                                        String userSubject) {
        commentRepository.getCommentById(commentId)
                .orElseThrow(CommentNotFoundException::new)
                .addCommentToEchoBoardComment(echoBoardComment);
        return convertor.convertEntityToResponseDTO(saveComment(echoBoardComment, userSubject));
    }


    public EchoBoardSolution.SolutionStatus getSolutionStatus(long solutionId) {
        return getSolutionById(solutionId).getStatus();
    }

    public EchoBoardSolutionResponse addVolunteerToSolution(long solutionId, OidcUser user) {

        return solutionRepository.getSolutionById(solutionId)
                .map(this::validateSolutionStatusIsVolunteerRequired)
                .map(s -> s.addVolunteer(userRepository.getUserBySubject(user.getSubject())
                        .orElseThrow(UserNotFoundException::new)))
                .map(this::updateSolution)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(SolutionNotFoundException::new);
    }

    public EchoBoardSolutionResponse updateSolutionStatus(long solutionId,
                                                          EchoBoardSolution.SolutionStatus updateToStage) {
        return solutionRepository.getSolutionById(solutionId)
                .map(solution -> solution.updateSolutionStatus(updateToStage))
                .map(this::updateSolution)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(SolutionNotFoundException::new);
    }

    public void createUser(OidcUser oidcUser) {
        userRepository.createUser(oidcUser);
    }

    private EchoBoardComment saveComment(EchoBoardComment comment, String userSubject) {
        return userRepository.getUserBySubject(userSubject)
                .map(comment::setEchoBoardUser)
                .map(commentRepository::save)
                .orElseThrow(UserNotFoundException::new);
    }

    private EchoBoardSolution saveSolution(EchoBoardSolution solution, String userSubject) {
        return userRepository.getUserBySubject(userSubject)
                .map(solution::setEchoBoardUser)
                .map(solutionRepository::save)
                .orElseThrow(UserNotFoundException::new);
    }

    private EchoBoardSolution updateSolution(EchoBoardSolution solution) {
        return solutionRepository.save(solution);
    }

    private EchoBoardSolution validateSolutionStatusIsVolunteerRequired(EchoBoardSolution echoBoardSolution) {
        if (!echoBoardSolution.getStatus().equals(EchoBoardSolution.SolutionStatus.VOLUNTEERS_REQUIRED)) {
            throw new IllegalSolutionArgumentException();
        }
        return echoBoardSolution;
    }
}
