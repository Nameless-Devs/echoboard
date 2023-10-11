package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoard;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link EchoBoard}
 */
public record EchoBoardResponseDto(List<EchoBoardCommentResponseDto> echoBoardComments,
                                   List<EchoBoardSolutionResponseDto> echoBoardSolutions, long id, String title,
                                   String content, Set<String> upvote, boolean anonymous, Instant created,
                                   EchoBoardUserResponseDto echoBoardUser) implements Serializable {

    @Override
    public EchoBoardUserResponseDto echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponseDto("Anonymous", null);
        }
        return echoBoardUser;
    }
}