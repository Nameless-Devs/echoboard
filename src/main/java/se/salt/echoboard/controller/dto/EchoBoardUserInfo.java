package se.salt.echoboard.controller.dto;


import java.util.List;


public record EchoBoardUserInfo(String name, String picture,
                                List<EchoBoardCommentResponse> echoBoardComments,
                                List<EchoBoardSolutionResponse> echoBoardSolutions,
                                List<EchoBoardResponse> echoBoards) {
}

