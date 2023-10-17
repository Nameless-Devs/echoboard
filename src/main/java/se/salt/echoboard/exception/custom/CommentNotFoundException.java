package se.salt.echoboard.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


public class CommentNotFoundException extends ResponseStatusException {
    public CommentNotFoundException() {
        super(HttpStatus.NOT_FOUND);
    }

    public CommentNotFoundException(long detail) {
        super(HttpStatus.NOT_FOUND, "Comment with id %s not found".formatted(detail));
    }
}

