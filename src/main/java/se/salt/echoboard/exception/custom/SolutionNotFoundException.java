package se.salt.echoboard.exception.custom;

import java.util.NoSuchElementException;

public class SolutionNotFoundException extends NoSuchElementException {
    public SolutionNotFoundException() {
        super("Solution Not found");
    }

}
