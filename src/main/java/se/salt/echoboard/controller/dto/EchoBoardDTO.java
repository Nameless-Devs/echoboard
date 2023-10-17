package se.salt.echoboard.controller.dto;

import lombok.Builder;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;

import java.util.List;
@Builder
public class EchoBoardDTO {
    private List<EchoBoardComment> echoBoardComments;
    private List<EchoBoardSolution> echoBoardSolutions;
}
