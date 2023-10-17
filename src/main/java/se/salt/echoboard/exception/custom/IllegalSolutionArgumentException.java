package se.salt.echoboard.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

public class IllegalSolutionArgumentException extends ResponseStatusException {
    public IllegalSolutionArgumentException() {
        super(BAD_REQUEST);
    }

}
