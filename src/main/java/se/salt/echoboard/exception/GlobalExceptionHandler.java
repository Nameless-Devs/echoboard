package se.salt.echoboard.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleEntityNotFoundException(NoSuchElementException ex){
        log.error("Entity not found", ex);
        return ex.getMessage();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleIncorrectSolutionStatus(IllegalArgumentException ex){
        log.error("Cannot Add Volunteer, Solution Status is not VOLUNTEERS REQUIRED", ex);
        return "Cannot Add Volunteer, Solution Status is not VOLUNTEERS REQUIRED";
    }
}
