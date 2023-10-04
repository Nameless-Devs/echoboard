package se.salt.echoboard.controller.dto;

import java.util.List;

/**
 * DTO for {@link se.salt.echoboard.model.EchoBoardUser}
 */
public record EchoBoardUserResponseDto(String name, String email, List<EchoBoardResponseDto> usersPosts,
                                       List<EchoBoardCommentResponseDto> usersComments,
                                       List<EchoBoardSolutionResponseDto> usersSolutions) {
}