package se.salt.echoboard.controller.dto;

import lombok.*;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;

import java.util.List;

//@Getter
//@Setter
@Builder
//@AllArgsConstructor
public record EchoBoardDTO (String name, String picture, List<EchoBoardComment> echoBoardComments,  List<EchoBoardSolution> echoBoardSolutions) {

}
