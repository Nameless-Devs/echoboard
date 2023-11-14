package se.salt.echoboard.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardPreview;
import se.salt.echoboard.controller.dto.EchoBoardResponse;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponse;
import se.salt.echoboard.exception.custom.EchoBoardNotFoundException;
import se.salt.echoboard.exception.custom.IllegalSolutionArgumentException;
import se.salt.echoboard.exception.custom.SolutionNotFoundException;
import se.salt.echoboard.exception.custom.UserNotFoundException;
import se.salt.echoboard.model.ChatRoom;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.repository.EchoBoardSolutionRepository;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;
import se.salt.echoboard.service.repository.JPAChatRoomRepository;
import se.salt.echoboard.service.repository.JPAEchoBoardRepository;

import java.util.Set;

@Service
@AllArgsConstructor
public class SolutionService {

    private final EchoBoardSolutionRepository solutionRepository;
    private final DTOConvertor convertor;
    private final JPAChatRoomRepository chatRoomRepository;
    private final EchoBoardUserRepository userRepository;
    private final JPAEchoBoardRepository echoBoardRepository;

    public EchoBoardSolutionResponse getSolutionById(long solutionId) {
        return solutionRepository.getSolutionById(solutionId)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(() -> new SolutionNotFoundException(solutionId));
    }

    public Integer upvoteSolution(long solutionId, String userSubject) {
        return solutionRepository.getSolutionById(solutionId)
                .map(solution -> solution.addUpvote(userSubject))
                .map(solutionRepository::save)
                .map(EchoBoardSolution::getUpvote)
                .map(Set::size)
                .orElseThrow(SolutionNotFoundException::new);
    }

    public EchoBoardSolutionResponse updateSolutionStatus(long solutionId, EchoBoardSolution.SolutionStatus updateToStage) {
        return solutionRepository.getSolutionById(solutionId)
                .map(this::checkAuthorization)
                .map(solution -> solution.updateSolutionStatus(updateToStage))
                .map(this::createChatRoomForEchoBoardSolutionIfVolunteersRequired)
                .map(solutionRepository::save)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(SolutionNotFoundException::new);
    }

    public EchoBoardSolutionResponse addVolunteerToSolution(long solutionId, OidcUser user, String volunteerId) {

        return solutionRepository.getSolutionById(solutionId)
                .map(this::checkAuthorization)
                .map(this::validateSolutionStatusIsVolunteerRequired)
                .map(s -> addVolunteerFromPendingVolunteers(s ,volunteerId))
                .map(solutionRepository::save)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(SolutionNotFoundException::new);
    }

    public EchoBoardSolutionResponse addPendingVolunteerToSolution(long solutionId, OidcUser user) {
        return solutionRepository.getSolutionById(solutionId)
                .map(this::validateSolutionStatusIsVolunteerRequired)
                .map(s -> s.addPendingVolunteer(userRepository.getUserBySubject(user.getSubject())
                        .orElseThrow(UserNotFoundException::new)))
                .map(solutionRepository::save)
                .map(convertor::convertEntityToResponseDTO)
                .orElseThrow(SolutionNotFoundException::new);
    }

    public Set<EchoBoardUser> getPendingVolunteers(long solutionId) {
        return solutionRepository.getSolutionById(solutionId)
                .map(EchoBoardSolution::getPendingVolunteers)
                .orElseThrow(SolutionNotFoundException::new);
    }

    private EchoBoardSolution createChatRoomForEchoBoardSolutionIfVolunteersRequired(EchoBoardSolution echoBoardSolution) {
        if (echoBoardSolution.getChatRoom() != null) return echoBoardSolution;
        if (!echoBoardSolution.getStatus()
                .equals(EchoBoardSolution.SolutionStatus.VOLUNTEERS_REQUIRED)) return echoBoardSolution;
        return echoBoardSolution
                .setChatRoom(chatRoomRepository.save(new ChatRoom().setEchoBoardSolution(echoBoardSolution)));
    }

    private EchoBoardSolution validateSolutionStatusIsVolunteerRequired(EchoBoardSolution echoBoardSolution) {
        if (!echoBoardSolution.getStatus().equals(EchoBoardSolution.SolutionStatus.VOLUNTEERS_REQUIRED)) {
            throw new IllegalSolutionArgumentException();
        }
        return echoBoardSolution;
    }

    private EchoBoardSolution addVolunteerFromPendingVolunteers(EchoBoardSolution solution, String volunteerId) {
        EchoBoardUser pendingVolunteer = solution.getPendingVolunteers()
                .stream().filter(echoBoardUser -> echoBoardUser.getSubject().equals(volunteerId))
                .findFirst().orElseThrow(UserNotFoundException::new);

        return solution.addVolunteer(pendingVolunteer)
                .removePendingVolunteer(pendingVolunteer);
    }

    private EchoBoardSolution checkAuthorization(EchoBoardSolution echoBoardSolution){
        OidcUser user = (OidcUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!echoBoardSolution.getEchoBoardUser().getSubject().equals(user.getSubject())){
            throw new IllegalArgumentException("User is not authorized to change this");
        }
        return echoBoardSolution;
    }

    public EchoBoardPreview getEchoBoardBySolutionId(long solutionId) {
        return echoBoardRepository.findByEchoBoardSolutions_Id(solutionId)
                .map(convertor::convertEntityToResponsePreviewDTO)
                .orElseThrow(EchoBoardNotFoundException::new);
    }
}
