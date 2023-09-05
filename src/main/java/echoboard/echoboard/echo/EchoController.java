package echoboard.echoboard;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EchoController {

    private final EchoService echoService;

    public EchoController(EchoService echoService) {
        this.echoService = echoService;
    }

    @GetMapping("/status")
    public String getStatus() {
        return "Server is up and running!";
    }

    @GetMapping("/echoes")
    public Iterable<Echo> getAllEchoes() {
        return echoService.getAllEchoes();
    }

    @PostMapping("/echoes")
    public void saveEcho(@RequestBody Echo echo) {
        echoService.saveEcho(echo);
    }

}
