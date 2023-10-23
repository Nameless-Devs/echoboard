package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoardComment;

import java.time.Instant;
import java.util.Set;

/**
 * DTO for {@link EchoBoardComment}
 */
public record EchoBoardCommentResponse(long id, String content, Set<String> upvote, Instant created,
                                       boolean anonymous,
                                       EchoBoardUserResponse echoBoardUser) {

    @Override
    public EchoBoardUserResponse echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponse("Anonymous", null);
        }
        return echoBoardUser;
    }
}