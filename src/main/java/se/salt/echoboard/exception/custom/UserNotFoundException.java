package se.salt.echoboard.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;

public class UserNotFoundException  extends ResponseStatusException {
    public UserNotFoundException() {
        super(HttpStatus.NOT_FOUND);
    }
    public UserNotFoundException(long detail) {
        super(HttpStatus.NOT_FOUND, "User with id %s not found".formatted(detail));
    }
}