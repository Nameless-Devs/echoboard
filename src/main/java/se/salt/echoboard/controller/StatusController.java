package se.salt.echoboard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;


@Controller
@RequestMapping("api")
public class StatusController {

    @RequestMapping(path = "status", method = {RequestMethod.HEAD})
    @ResponseStatus(HttpStatus.OK)
    public void getStatus() {
    }
}
