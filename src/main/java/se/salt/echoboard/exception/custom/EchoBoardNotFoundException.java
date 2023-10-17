package se.salt.echoboard.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

public class EchoBoardNotFoundException extends ResponseStatusException {
    public EchoBoardNotFoundException() {
        super(NOT_FOUND);
    }

    public EchoBoardNotFoundException(long detail) {
        super(NOT_FOUND, "EchoBoard with id %s not found".formatted(detail));
    }

}
