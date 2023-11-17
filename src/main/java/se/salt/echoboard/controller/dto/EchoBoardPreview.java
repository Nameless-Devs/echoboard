package se.salt.echoboard.controller.dto;


import java.io.Serializable;

public record EchoBoardPreview(long id, String title,
                               boolean anonymous,
                               EchoBoardUserResponse echoBoardUser) implements Serializable {
    @Override
    public EchoBoardUserResponse echoBoardUser() {
        if (anonymous) {
            return new EchoBoardUserResponse("","Anonymous", null);
        }
        return echoBoardUser;
    }
}
