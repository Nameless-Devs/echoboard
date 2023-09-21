package se.salt.echoboard.controller;

import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.service.EchoBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "https://echoboard-nameless-dev.vercel.app")
public class EchoController {

    private final EchoBoardService echoService;

    public EchoController(EchoBoardService echoService) {
        this.echoService = echoService;
    }

    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok().body("Server is up and running!");
    }

//    @GetMapping("/echoes/{id}")
//    public ResponseEntity<EchoBoard> getEcho(@PathVariable String id) {
//        return ResponseEntity.ok(echoService.getEchoById(id));
//    }
//
    @GetMapping("/echoes")
    public ResponseEntity<List<EchoBoard>> getAllEchoes() {

        List<EchoBoard> echoes = echoService.findAll(5);
        if (echoes != null && !echoes.isEmpty()) {
            return ResponseEntity.ok(echoes);
        }
        return ResponseEntity.noContent().build();
    }

//    @PostMapping("/echoes")
//    public ResponseEntity<Void> saveEcho(@RequestBody EchoBoard echoBoard) {
//        Long echoId = echoService.saveEcho(echoBoard).getId();
//
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(echoId)
//                .toUri();
//        return ResponseEntity.created(location).build();
//    }
//
//    @GetMapping("/echoes/{echoId}/echoBoardSolutions/{echoBoardSolutionId}")
//    public ResponseEntity<EchoBoardSolution> getEchoBoardSolution(@PathVariable String echoId, @PathVariable String echoBoardSolutionId) {
//
//        EchoBoard echoBoard = echoService.getEchoById(echoId);
//        Optional<EchoBoardSolution> echoBoardSolution = echoBoard.getEchoBoardSolutions().stream().filter(solution -> solution.getId().equals(echoBoardSolutionId)).findFirst();
//        return ResponseEntity.of(echoBoardSolution);
//
//    }
//
//    @PostMapping("/echoes/{echoId}/echoBoardSolutions")
//    public ResponseEntity<String> saveEchoBoardSolution(@PathVariable String echoId, @RequestBody EchoBoardSolution echoBoardSolution) {
//
//        EchoBoard echoBoard = echoService.getEchoById(echoId);
//
//        String echoBoardSolutionId = echoService.addSolutionToEcho(echoBoard, echoBoardSolution);
//
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(echoBoardSolutionId)
//                .toUri();
//
//        return ResponseEntity.created(location).body(echoBoardSolutionId);
//
//    }
//
//    @PostMapping("/echoes/{echoId}/comments")
//    public ResponseEntity<Void> saveComments(@PathVariable String echoId, @RequestBody EchoBoardComment echoBoardComment) {
//
//        EchoBoard echoBoard = echoService.getEchoById(echoId);
//
//        String commentId = echoService.addCommentToEcho(echoBoard, echoBoardComment);
//
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(commentId)
//                .toUri();
//        return ResponseEntity.created(location).build();
//    }
//
//    @PatchMapping("/echoes/{echoId}/upvote")
//    public ResponseEntity<Long> upvoteEcho(@PathVariable String echoId) {
//        EchoBoard echoBoard = echoService.getEchoById(echoId);
//        Long upvote = echoBoard.addUpvote();
//        echoService.saveEcho(echoBoard);
//        return ResponseEntity.accepted().body(upvote);
//    }
//
//    @DeleteMapping("/echoes/{id}")
//    public ResponseEntity<EchoBoard> deleteEcho(@PathVariable String id) {
//        echoService.deleteEcho(id);
//        return ResponseEntity.accepted().build();
//    }

}

