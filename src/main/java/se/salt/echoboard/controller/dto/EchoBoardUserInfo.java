package se.salt.echoboard.controller.dto;


import lombok.Builder;

import java.util.List;

@Builder
public record EchoBoardUserInfo(String name, String picture, String subject,
                                List<EchoBoardCommentResponse> echoBoardComments,
                                List<EchoBoardSolutionResponse> echoBoardSolutions,
                                List<EchoBoardSolutionResponse> pendingVolunteeredSolutions,
                                List<EchoBoardSolutionResponse> volunteeredSolutions,
                                List<EchoBoardResponse> echoBoards) {
}

