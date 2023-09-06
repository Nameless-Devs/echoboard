package echoboard.echoboard.echo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
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
//    public ResponseEntity<ArrayList<EchoBoard>> getAllEchoes() {
//        return ResponseEntity.ok().body(echoService.getAllEchoes());
//    }

    @GetMapping("/echoes/{id}")
    public ResponseEntity<EchoBoard> getEcho(@PathVariable String id) {
        System.out.println("echoService.getEchoById(id)");
        return ResponseEntity.of(echoService.getEchoById(id));
    }

    @PostMapping("/echoes")
    public ResponseEntity<Void> saveEcho(@RequestBody EchoBoard echoBoard) {
        String echoId = echoService.saveEcho(echoBoard).getId();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(echoId)
                .toUri();
        return ResponseEntity.created(location).build();
    }


}

