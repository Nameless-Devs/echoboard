package se.salt.echoboard.exception.custom;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

public class UserNotFoundException extends ResponseStatusException {
    public UserNotFoundException() {
        super(NOT_FOUND);
    }

    public UserNotFoundException(long detail) {
        super(NOT_FOUND, "User with id %s not found".formatted(detail));
    }
}