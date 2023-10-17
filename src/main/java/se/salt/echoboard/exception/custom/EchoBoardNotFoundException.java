package se.salt.echoboard.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EchoBoardNotFoundException extends ResponseStatusException {
    public EchoBoardNotFoundException() {
        super(HttpStatus.NOT_FOUND);
    }

    public EchoBoardNotFoundException(long detail) {
        super(HttpStatus.NOT_FOUND, "EchoBoard with id %s not found".formatted(detail));
    }

}
