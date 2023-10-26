package se.salt.echoboard.controller.dto;

import lombok.*;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;

import java.time.Instant;
import java.util.List;
import java.util.Set;



@Builder
public record EchoBoardDTO (String name, String picture, List<EchoBoardComment> echoBoardComments, List<EchoBoardSolution> echoBoardSolutions, List<EchoBoard> echoBoards) {


}
