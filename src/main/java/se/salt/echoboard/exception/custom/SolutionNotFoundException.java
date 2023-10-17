package se.salt.echoboard.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SolutionNotFoundException  extends ResponseStatusException {
    public SolutionNotFoundException() {
        super(HttpStatus.NOT_FOUND);
    }
    public SolutionNotFoundException(long detail) {
        super(HttpStatus.NOT_FOUND, "Solution with id %s not found".formatted(detail));
    }
}
