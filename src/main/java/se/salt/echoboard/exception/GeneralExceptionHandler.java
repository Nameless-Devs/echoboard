package se.salt.echoboard.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import se.salt.echoboard.exception.custom.IllegalSolutionArgumentException;

import java.util.NoSuchElementException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Slf4j
@RestControllerAdvice
public class GeneralExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(NOT_FOUND)
    public String handleEntityNotFoundException(NoSuchElementException ex) {
        log.error("Entity not found: " + ex.getMessage());
        return ex.getMessage();
    }

    @ExceptionHandler(IllegalSolutionArgumentException.class)
    @ResponseStatus(BAD_REQUEST)
    public String handleSolutionIllegalArgumentException(IllegalSolutionArgumentException ex) {
        log.error("Illegal Argument: " + ex.getMessage());
        return ex.getMessage();
    }

    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(BAD_REQUEST)
    public String handleBadRequest(NullPointerException ex) {
        log.error("Null pointer encountered, something went wrong: "+ ex.getMessage());
        return ex.getMessage();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(BAD_REQUEST)
    public String handleIllegalArgumentException(IllegalArgumentException ex) {
        log.error("Illegal Argument: " + ex.getMessage());
        return ex.getMessage();
    }
}