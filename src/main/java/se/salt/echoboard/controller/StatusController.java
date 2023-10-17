package se.salt.echoboard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.HEAD;


@Controller
@RequestMapping("api/v1/status")
public class StatusController {

    @RequestMapping(method = {HEAD})
    @ResponseStatus(OK)
    public void getStatus() {
    }
}
