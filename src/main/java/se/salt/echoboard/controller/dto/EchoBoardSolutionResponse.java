package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.ChatRoom;
import se.salt.echoboard.model.EchoBoardSolution;

import java.time.Instant;
import java.util.Set;

/**
 * DTO for {@link EchoBoardSolution}
 */
public record EchoBoardSolutionResponse(long id, String content, Set<String> upvote, boolean anonymous,
                                        EchoBoardSolution.SolutionStatus status, Instant created,
                                        EchoBoardUserResponse echoBoardUser,
                                        Set<EchoBoardUserResponse> volunteers,
                                        Set<EchoBoardUserResponse> pendingVolunteers,
                                        ChatRoom chatRoom) {

    @Override
    public EchoBoardUserResponse echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponse("Anonymous", null);
        }
        return echoBoardUser;
    }
}