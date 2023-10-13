package se.salt.echoboard.exception.custom;

import java.util.NoSuchElementException;

public class EchoBoardNotFoundException extends NoSuchElementException {
    public EchoBoardNotFoundException() {
        super("EchoBoard Not found");
    }

}
