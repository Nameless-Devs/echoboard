package se.salt.echoboard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("api")
public class StatusController {

    @RequestMapping(path = "status", method = { RequestMethod.HEAD })
    @ResponseStatus(HttpStatus.OK)
    public void getStatus() {
    }
}
