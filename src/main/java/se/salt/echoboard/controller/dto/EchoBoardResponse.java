package se.salt.echoboard.controller.dto;

import lombok.Builder;
import se.salt.echoboard.model.EchoBoard;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Set;
@Builder

/**
 * DTO for {@link EchoBoard}
 */
public record EchoBoardResponse(List<EchoBoardCommentResponse> echoBoardComments,
                                List<EchoBoardSolutionResponse> echoBoardSolutions, long id, String title,
                                String content, Set<String> upvote, boolean anonymous, Instant created,
                                EchoBoardUserResponse echoBoardUser) implements Serializable {

    @Override
    public EchoBoardUserResponse echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponse("Anonymous", null);
        }
        return echoBoardUser;
    }
}