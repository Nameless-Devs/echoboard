package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;

import java.time.Instant;
import java.util.List;

/**
 * DTO for {@link EchoBoard}
 */
public record EchoBoardResponseDto(long id, String title, String content, String author, int upvote, Instant created,
                                   List<EchoBoardSolution> echoBoardSolutions,
                                   List<EchoBoardComment> echoBoardComments ,
                                   boolean anonymous) {

    @Override
    public String author() {
        if (anonymous) {
            return "Anonymous";
        }
        return author;
    }
}