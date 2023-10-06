package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoardComment;

import java.time.Instant;

/**
 * DTO for {@link EchoBoardComment}
 */
public record EchoBoardCommentResponseDto(long id, String author, String content, int upvote, Instant created) {
}