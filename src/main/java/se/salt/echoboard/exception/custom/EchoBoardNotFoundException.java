package se.salt.echoboard.exception.custom;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.NO_CONTENT;

public class EchoBoardNotFoundException extends ResponseStatusException {
    public EchoBoardNotFoundException() {
        super(NOT_FOUND);
    }

    public EchoBoardNotFoundException(long detail) {
        super(NO_CONTENT, "EchoBoard with id %s not found".formatted(detail));
    }

}
