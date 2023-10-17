package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoard;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link EchoBoard}
 */
public record EchoBoardResponseDTO(List<EchoBoardCommentResponseDTO> echoBoardComments,
                                   List<EchoBoardSolutionResponseDTO> echoBoardSolutions, long id, String title,
                                   String content, Set<String> upvote, boolean anonymous, Instant created,
                                   EchoBoardUserResponseDTO echoBoardUser) implements Serializable {

    @Override
    public EchoBoardUserResponseDTO echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponseDTO("Anonymous", null);
        }
        return echoBoardUser;
    }
}