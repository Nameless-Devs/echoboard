package echoboard.echoboard;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/status")
    public String getStatus() {
        return "Server is up and running!";
    }

}
