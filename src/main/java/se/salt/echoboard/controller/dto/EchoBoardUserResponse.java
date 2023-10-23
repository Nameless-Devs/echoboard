package se.salt.echoboard.controller.dto;

import se.salt.echoboard.model.EchoBoardUser;

import java.io.Serializable;

/**
 * DTO for {@link EchoBoardUser}
 */
public record EchoBoardUserResponse(String name, String picture) implements Serializable {
}