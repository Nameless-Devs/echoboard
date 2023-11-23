package se.salt.echoboard.exception.custom;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.NO_CONTENT;

public class SolutionNotFoundException extends ResponseStatusException {
    public SolutionNotFoundException() {
        super(NOT_FOUND);
    }

    public SolutionNotFoundException(long detail) {
        super(NO_CONTENT, "Solution with id %s not found".formatted(detail));
    }
}
