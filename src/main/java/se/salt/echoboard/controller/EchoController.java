package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.service.EchoBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EchoController {

    private final EchoBoardService echoService;

    @GetMapping("/echoes/{id}")
    public ResponseEntity<EchoBoard> getEcho(@PathVariable long id) {
        return ResponseEntity.of(echoService.getEchoById(id));
    }

    @GetMapping("/echoes")
    public ResponseEntity<List<EchoBoard>> getAllEchoes() {

        List<EchoBoard> echoes = echoService.findAll();
        if (echoes != null && !echoes.isEmpty()) {
            Collections.reverse(echoes);
            return ResponseEntity.ok(echoes);
        }
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/echoes/{echoId}/upvote")
    public ResponseEntity<Integer> upvoteEcho(@PathVariable long echoId) {
        return ResponseEntity.of(echoService.upvoteEcho(echoId));
    }

    @PatchMapping("/echoes/{echoId}/comments/{commentId}/upvote")
    public ResponseEntity<Integer> upvoteComment(@PathVariable long echoId, @PathVariable long commentId) {
        return ResponseEntity.of(echoService.upvoteComment(commentId));
    }

    @PostMapping("/echoes")
    public ResponseEntity<Void> saveEcho(@RequestBody EchoBoard echoBoard) {
        Long echoId = echoService.saveEcho(echoBoard).getId();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(echoId)
                .toUri();
        return ResponseEntity.created(location).build();
    }
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

    @PostMapping("/echoes/{echoBoardId}/comments")
    public ResponseEntity<Void> addCommentToEchoBoard(@PathVariable long echoBoardId, @RequestBody EchoBoardComment echoBoardComment) {

        Optional<Long> commentId = echoService.addCommentToEcho(echoBoardId, echoBoardComment);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(commentId)
                .toUri();
        return ResponseEntity.created(location).build();
    }
//
//
//    @DeleteMapping("/echoes/{id}")
//    public ResponseEntity<EchoBoard> deleteEcho(@PathVariable String id) {
//        echoService.deleteEcho(id);
//        return ResponseEntity.accepted().build();
//    }


}

