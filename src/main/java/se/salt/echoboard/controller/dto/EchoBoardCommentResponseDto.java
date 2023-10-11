package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoardComment;

import java.time.Instant;
import java.util.Set;

/**
 * DTO for {@link EchoBoardComment}
 */
public record EchoBoardCommentResponseDto(long id, String content,  Set<String> upvote, Instant created, boolean anonymous,
                                          EchoBoardUserResponseDto echoBoardUser) {

    @Override
    public EchoBoardUserResponseDto echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponseDto("Anonymous", null);
        }
        return echoBoardUser;
    }
}