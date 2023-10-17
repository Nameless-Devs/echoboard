package se.salt.echoboard.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

public class SolutionNotFoundException  extends ResponseStatusException {
    public SolutionNotFoundException() {
        super(NOT_FOUND);
    }
    public SolutionNotFoundException(long detail) {
        super(NOT_FOUND, "Solution with id %s not found".formatted(detail));
    }
}
