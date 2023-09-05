package echoboard.echoboard.echo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;


@RestController
@RequestMapping("/api")
public class EchoController {

    private final EchoService echoService;

    public EchoController(EchoService echoService) {
        this.echoService = echoService;
    }

    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok().body("Server is up and running!");
    }

//    @GetMapping("/echoes")
//    public ResponseEntity<ArrayList<Echo>> getAllEchoes() {
//        return ResponseEntity.ok().body(echoService.getAllEchoes());
//    }

    @GetMapping("/echoes/{id}")
    public ResponseEntity<Echo> getEcho(@PathVariable long id) {
        return ResponseEntity.of(echoService.getEchoById(id));
    }

    @PostMapping("/echoes")
    public ResponseEntity<Void> saveEcho(@RequestBody Echo echo) {
        long echoId = echoService.saveEcho(echo).getId();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(echoId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

}
