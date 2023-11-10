package se.salt.echoboard.controller.dto;


import lombok.Builder;

import java.util.List;

@Builder
public record EchoBoardUserInfo(String name, String picture,
                                List<EchoBoardCommentResponse> echoBoardComments,
                                List<EchoBoardSolutionResponse> echoBoardSolutions,
                                List<EchoBoardResponse> echoBoards) {
}

