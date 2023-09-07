package echoboard.echoboard.echo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.Optional;


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

    @PostMapping("/echoes/{echoId}/comments")
    public ResponseEntity<Void> saveComments(@PathVariable String echoId, @RequestBody Comment comment) {

        Optional<EchoBoard> optionalEchoBoard = echoService.getEchoById(echoId);

        if (optionalEchoBoard.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        EchoBoard echoBoard = optionalEchoBoard.get();
        echoBoard.getComments().add(comment);
        echoService.saveEcho(echoBoard);

        String CommentId = echoService.saveComment(comment).getId();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(CommentId)
                .toUri();
        return ResponseEntity.created(location).build();
    }

}

