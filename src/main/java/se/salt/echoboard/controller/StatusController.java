package se.salt.echoboard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class StatusController {

    @GetMapping("/status")
    @ResponseStatus(HttpStatus.OK)
    public String getStatus() {
        return "Server is up and running!";
    }
}
