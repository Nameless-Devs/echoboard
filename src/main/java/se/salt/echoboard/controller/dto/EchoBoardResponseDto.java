package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoard;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link EchoBoard}
 */
public record EchoBoardResponseDto(long id, String title, String content, String author, int upvote,
                                   Instant created) implements Serializable {
}