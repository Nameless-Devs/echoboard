package echoboard.echoboard.echo;

import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;
import java.util.Map;
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
        return ResponseEntity.ok(echoService.getEchoById(id));
    }

    @GetMapping("/echoes")
    public ResponseEntity<List<EchoBoard>> getAllEchoes(
            @RequestParam(name = "limit", defaultValue = "1") int limit,
            @RequestParam(name = "lastKey", required = false) Map<String, AttributeValue> lastKey) {

        List<EchoBoard> echoes = echoService.getAllEchoes(limit, lastKey);
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

        EchoBoard echoBoard = echoService.getEchoById(echoId);

        String commentId = echoService.addCommentToEcho(echoBoard, comment);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(commentId)
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/echoes/{echoId}/upvote")
    public ResponseEntity<Long> upvoteEcho(@PathVariable String echoId) {
        EchoBoard echoBoard = echoService.getEchoById(echoId);
        Long upvote = echoBoard.addUpvote();
        echoService.saveEcho(echoBoard);
        return ResponseEntity.accepted().body(upvote);
    }

    @DeleteMapping("/echoes/{id}")
    public ResponseEntity<EchoBoard> deleteEcho(@PathVariable String id) {
        echoService.deleteEcho(id);
        return ResponseEntity.accepted().build();
    }

}

