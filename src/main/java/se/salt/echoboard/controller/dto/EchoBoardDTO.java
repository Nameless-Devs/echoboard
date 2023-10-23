package se.salt.echoboard.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;

import java.util.List;
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class EchoBoardDTO {
    public List<EchoBoardComment> echoBoardComments;
    public List<EchoBoardSolution> echoBoardSolutions;

}
