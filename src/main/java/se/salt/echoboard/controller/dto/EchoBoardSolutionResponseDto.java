package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoardSolution;

import java.time.Instant;

/**
 * DTO for {@link EchoBoardSolution}
 */
public record EchoBoardSolutionResponseDto(long id, String content, int upvote, boolean anonymous,
                                           EchoBoardSolution.SolutionStatus status, Instant created,
}