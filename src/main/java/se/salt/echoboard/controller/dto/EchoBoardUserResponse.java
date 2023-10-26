package se.salt.echoboard.controller.dto;

import lombok.Builder;
import se.salt.echoboard.model.EchoBoardUser;

import java.io.Serializable;
@Builder

/**
 * DTO for {@link EchoBoardUser}
 */
public record EchoBoardUserResponse(String name, String picture) implements Serializable {
}