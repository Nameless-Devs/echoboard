package echoboard.echoboard.echo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;
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
        return ResponseEntity.of(echoService.getEchoById(id));
    }

    @GetMapping("/echoes")
    public ResponseEntity<List<EchoBoard>> getAllEchoes() {
        List<EchoBoard> echoes = echoService.getAllEchoes();
        if (echoes != null && !echoes.isEmpty()) {
            return ResponseEntity.ok(echoes);
        } else {
            return ResponseEntity.noContent().build();
        }
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

        String commentId = echoService.addCommentToEcho(optionalEchoBoard.get(), comment);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(commentId)
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/echoes/{echoId}/upvote")
    public ResponseEntity<Long> upvoteEcho(@PathVariable String echoId) {
        Optional<EchoBoard> optionalEchoBoard = echoService.getEchoById(echoId);
        if (optionalEchoBoard.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Long upvote =  optionalEchoBoard.get().getUpvote() + 1L;
        optionalEchoBoard.get().setUpvote(upvote);
        echoService.saveEcho(optionalEchoBoard.get());
        return ResponseEntity.accepted().body(upvote);
    }

}

