package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoardSolution;

import java.time.Instant;
import java.util.Set;

/**
 * DTO for {@link EchoBoardSolution}
 */
public record EchoBoardSolutionResponseDto(long id, String content, Set<String> upvote, boolean anonymous,
                                           EchoBoardSolution.SolutionStatus status, Instant created,
                                           EchoBoardUserResponseDto echoBoardUser, Set<EchoBoardUserResponseDto> volunteers) {

    @Override
    public EchoBoardUserResponseDto echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponseDto("Anonymous", null);
        }
        return echoBoardUser;
    }
}