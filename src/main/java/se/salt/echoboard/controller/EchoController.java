package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.service.EchoBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://echoboard-nameless-dev.vercel.app")
@AllArgsConstructor
//@CrossOrigin(origins = "*")
public class EchoController {

    private final EchoBoardService echoService;

    @GetMapping("/echoes/{id}")
    public ResponseEntity<EchoBoard> getEcho(@PathVariable long id) {
        return ResponseEntity.of(echoService.getEchoById(id));
    }

    @GetMapping("/echoes")
    public ResponseEntity<List<EchoBoard>> getAllEchoes() {

        List<EchoBoard> echoes = echoService.findAll(5);
        if (echoes != null && !echoes.isEmpty()) {
            return ResponseEntity.ok(echoes);
        }
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/echoes/{echoId}/upvote")
    public ResponseEntity<Integer> upvoteEcho(@PathVariable long echoId) {
        Optional<EchoBoard> echoBoard = echoService.getEchoById(echoId);
         echoBoard.map(EchoBoard::addUpvote);
         echoBoard.map(echoService::saveEcho);
         return ResponseEntity.of(echoBoard.map(EchoBoard::getUpvote));
    }

    @PatchMapping("/echoes/{echoId}/comments/{commentId}/upvote")
    public ResponseEntity<Integer> upvoteComment(@PathVariable Long echoId, @PathVariable Long commentId) {
        Optional<EchoBoard> optionalEchoBoard = echoService.getEchoById(echoId);

        if (optionalEchoBoard.isPresent()) {
            EchoBoard echoBoard = optionalEchoBoard.get();
            Optional<EchoBoardComment> optionalComment = echoService.findCommentById(echoBoard, commentId);

            if (optionalComment.isPresent()) {
                EchoBoardComment comment = optionalComment.get();
                Integer upvote = comment.addUpvote();
                echoService.saveEcho(echoBoard);
                return ResponseEntity.accepted().body(upvote);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
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

    @GetMapping("/echoes/{echoId}/echoBoardSolutions/{echoBoardSolutionId}")
    public ResponseEntity<EchoBoardSolution> getEchoBoardSolution(@PathVariable Long echoId, @PathVariable Long echoBoardSolutionId) {

        Optional<EchoBoard> echoBoard = echoService.getEchoById(echoId);
        if (echoBoard.isPresent()) {
            Optional<EchoBoardSolution> echoBoardSolution = echoBoard.get().getEchoBoardSolutions().stream().filter(solution -> solution.getId().equals(echoBoardSolutionId)).findFirst();
            return ResponseEntity.of(echoBoardSolution);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/echoes/{echoId}/echoBoardSolutions")
    public ResponseEntity<Long> saveEchoBoardSolution(@PathVariable Long echoId, @RequestBody EchoBoardSolution echoBoardSolution) {

        Optional<EchoBoard> echoBoard = echoService.getEchoById(echoId);

        Long echoBoardSolutionId = echoService.addSolutionToEcho(echoBoard, echoBoardSolution);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(echoBoardSolutionId)
                .toUri();

        System.out.printf(String.valueOf(echoBoardSolutionId));
        return ResponseEntity.created(location).body(echoBoardSolutionId);

    }

    @PostMapping("/echoes/{echoId}/comments")
    public ResponseEntity<Void> saveComments(@PathVariable long echoId, @RequestBody EchoBoardComment echoBoardComment) {

        Optional<EchoBoard> echoBoard = echoService.getEchoById(echoId);

        Long commentId = echoService.addCommentToEcho(echoBoard, echoBoardComment);

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

