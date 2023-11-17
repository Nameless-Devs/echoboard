package se.salt.echoboard.controller.dto;

import lombok.Builder;
import se.salt.echoboard.model.EchoBoardUser;


/**
 * DTO for {@link EchoBoardUser}
 */
@Builder
public record EchoBoardUserResponse(String subject, String name, String picture) {
}