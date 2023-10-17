package se.salt.echoboard.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class IllegalSolutionArgumentException extends ResponseStatusException {
    public IllegalSolutionArgumentException() {
        super(HttpStatus.BAD_REQUEST);
    }

}
