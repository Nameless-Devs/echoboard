package se.salt.echoboard.exception.custom;

import java.util.NoSuchElementException;

public class CommentNotFoundException extends NoSuchElementException {
    public CommentNotFoundException() {
        super("Comment Not found");
    }

}

