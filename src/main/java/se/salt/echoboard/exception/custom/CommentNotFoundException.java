package se.salt.echoboard.exception.custom;

import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.NO_CONTENT;


public class CommentNotFoundException extends ResponseStatusException {
    public CommentNotFoundException() {
        super(NOT_FOUND);
    }

    public CommentNotFoundException(long detail) {
        super(NO_CONTENT, "Comment with id %s not found".formatted(detail));
    }
}

