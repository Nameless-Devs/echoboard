package se.salt.echoboard.service;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import se.salt.echoboard.controller.dto.*;
import se.salt.echoboard.exception.custom.CommentNotFoundException;
import se.salt.echoboard.exception.custom.IllegalSolutionArgumentException;
import se.salt.echoboard.exception.custom.UserNotFoundException;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
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

    private final DTOConvertor convertor;


    @Transactional
    public Optional<EchoBoardResponseDTO> saveEcho(EchoBoard echoBoard, String userSubject) {
        return userRepository.getUserBySubject(userSubject)
                .map(echoBoard::setUser)
                .map(echoBoardRepository::save)
                .map(convertor::convertEntityToResponseDTO);
    }

    private EchoBoardComment updateComment(EchoBoardComment comment) {
        return commentRepository.save(comment);
    }

    public Optional<EchoBoardResponseDTO> getEchoById(Long id) {
        return echoBoardRepository.getEchoById(id)
                .map(convertor::convertEntityToResponseDTO);
    }

    public List<EchoBoardResponseDTO> findAll() {
        return echoBoardRepository.findByOrderByCreatedDesc(Pageable.unpaged())
                .stream().map(convertor::convertEntityToResponseDTO)
                .toList();
    }

    public Optional<EchoBoardCommentResponseDTO> getCommentById(long commentId) {
        return commentRepository.getCommentById(commentId)
                .map(convertor::convertEntityToResponseDTO);
    }


    public Optional<EchoBoardSolution> getSolutionById(long solutionId) {
        return solutionRepository.getSolutionById(solutionId);
    }

    @Transactional
    public Optional<EchoBoardCommentResponseDTO> addCommentToEcho(long echoBoardId, EchoBoardComment echoBoardComment, String userSubject) {
        return echoBoardRepository.getEchoById(echoBoardId).flatMap(e -> {
            e.addComment(echoBoardComment);
            return saveComment(echoBoardComment, userSubject)
                    .map(convertor::convertEntityToResponseDTO);
        });
    }

    @Transactional
    public Optional<EchoBoardSolutionResponseDTO> addSolutionToEcho(long echoBoardId, EchoBoardSolution echoBoardSolution, String userSubject) {

        return echoBoardRepository.getEchoById(echoBoardId).flatMap(e -> {
            e.addSolution(echoBoardSolution);
            return saveSolution(echoBoardSolution, userSubject)
                    .map(convertor::convertEntityToResponseDTO);
        });
    }

    @Transactional
    public Optional<Integer> upvoteComment(long commentId, String userSubject) {
        return commentRepository.getCommentById(commentId)
                .map(comment -> comment.addUpvote(userSubject))
                .map(this::updateComment)
                .map(EchoBoardComment::getUpvote)
                .map(Set::size);
    }

    @Transactional
    public Optional<Set<String>> upvoteEcho(long echoId, String userSubject) {
        return echoBoardRepository.getEchoById(echoId)
                .map(echoBoard -> echoBoard.addUpvote(userSubject))
                .map(echoBoardRepository::save)
                .map(EchoBoard::getUpvote);
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

    public Optional<EchoBoardUserResponseDTO> getUserBySubject(String id) {
        return userRepository.getUserBySubject(id)
                .map(convertor::convertEntityToResponseDTO);
    }

    @Transactional
    public Optional<EchoBoardCommentResponseDTO> addCommentToComment(long commentId,
                                                                     EchoBoardComment echoBoardComment,
                                                                     String userSubject) {
        commentRepository.getCommentById(commentId)
                .orElseThrow(CommentNotFoundException::new)
                .addCommentToEchoBoardComment(echoBoardComment);
        return saveComment(echoBoardComment, userSubject)
                .map(convertor::convertEntityToResponseDTO);
    }


    public  Optional<EchoBoardSolution.SolutionStatus> getSolutionStatus(long solutionId){
        return getSolutionById(solutionId)
                .map(EchoBoardSolution::getStatus);
    }

    @Transactional
    public Optional<EchoBoardSolutionResponseDTO> addVolunteerToSolution(long solutionId, OidcUser user){

        return getSolutionById(solutionId)
                .map(this::validateSolutionStatusIsVolunteerRequired)
                .map(s -> s.addVolunteer(userRepository.getUserBySubject(user.getSubject())
                        .orElseThrow(UserNotFoundException::new)))
                .map(this::updateSolution)
                .map(convertor::convertEntityToResponseDTO);
    }

    @Transactional
    public Optional<EchoBoardSolutionResponseDTO> updateSolutionStatus(long solutionId,
                                                                       EchoBoardSolution.SolutionStatus updateToStage) {
        return getSolutionById(solutionId)
                .map(solution -> solution.updateSolutionStatus(updateToStage))
                .map(this::updateSolution)
                .map(convertor::convertEntityToResponseDTO);
    }

    @Transactional
    public void createUser(OidcUser oidcUser) {
        userRepository.createUser(oidcUser);
    }

    private Optional<EchoBoardComment> saveComment(EchoBoardComment comment, String userSubject) {
        return userRepository.getUserBySubject(userSubject)
                .map(comment::setEchoBoardUser)
                .map(commentRepository::save);
    }


    private Optional<EchoBoardSolution> saveSolution(EchoBoardSolution solution, String userSubject) {
        return userRepository.getUserBySubject(userSubject)
                .map(solution::setEchoBoardUser)
                .map(solutionRepository::save);
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
