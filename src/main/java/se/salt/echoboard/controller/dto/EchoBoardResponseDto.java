package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;

import java.time.Instant;
import java.util.List;

/**
 * DTO for {@link EchoBoard}
 */
public record EchoBoardResponseDto(List<EchoBoardCommentResponseDto> echoBoardComments,
                                   List<EchoBoardSolutionResponseDto> echoBoardSolutions, long id, String title, String content,
                                   int upvote, boolean anonymous, Instant created,
                                   EchoBoardUserResponseDto echoBoardUser) implements Serializable {

    @Override
    public String author() {
        if (anonymous) {
            return "Anonymous";
        }
        return author;
    }
}