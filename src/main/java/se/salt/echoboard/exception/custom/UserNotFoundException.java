package se.salt.echoboard.exception.custom;

import java.util.NoSuchElementException;

public class UserNotFoundException extends NoSuchElementException {
    public UserNotFoundException() {
        super("User Not found");
    }

}