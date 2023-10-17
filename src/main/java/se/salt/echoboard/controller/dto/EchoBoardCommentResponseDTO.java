package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoardComment;

import java.time.Instant;
import java.util.Set;

/**
 * DTO for {@link EchoBoardComment}
 */
public record EchoBoardCommentResponseDTO(long id, String content, Set<String> upvote, Instant created,
                                          boolean anonymous,
                                          EchoBoardUserResponseDTO echoBoardUser) {

    @Override
    public EchoBoardUserResponseDTO echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponseDTO("Anonymous", null);
        }
        return echoBoardUser;
    }
}