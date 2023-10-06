package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoardSolution;

import java.time.Instant;

/**
 * DTO for {@link EchoBoardSolution}
 */
public record EchoBoardSolutionResponseDto(long id, String author, String content, int upvote,
                                           EchoBoardSolution.SolutionStatus status, Instant created) {
}