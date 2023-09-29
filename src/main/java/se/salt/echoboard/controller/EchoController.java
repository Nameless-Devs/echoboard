package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.EchoBoardService;

import java.net.URI;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/echoes")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EchoController {

    private final EchoBoardService echoService;

    @GetMapping("{id}")
    public ResponseEntity<EchoBoard> getEcho(@PathVariable long id) {
        return ResponseEntity.of(echoService.getEchoById(id));
    }

    @GetMapping
    public ResponseEntity<List<EchoBoard>> getAllEchoes() {

        List<EchoBoard> echoes = echoService.findAll();
        return ResponseEntity.ofNullable(echoes);
    }

    @PatchMapping("{echoId}/upvote")
    public ResponseEntity<Integer> upvoteEcho(@PathVariable long echoId) {
        return ResponseEntity.of(echoService.upvoteEcho(echoId));
    }

    @PatchMapping("{echoId}/comments/{commentId}/upvote")
    public ResponseEntity<Integer> upvoteComment(@PathVariable long echoId, @PathVariable long commentId) {
        return ResponseEntity.of(echoService.upvoteComment(commentId));
    }

    @PostMapping
    public ResponseEntity<Void> saveEcho(@RequestBody EchoBoard echoBoard
            , @AuthenticationPrincipal OidcUser user
    ) {
        Long echoId = echoService.saveEcho(echoBoard).getId();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(echoId)
                .toUri();
        return ResponseEntity.created(location).build();
    }


    @GetMapping("{echoId}/solutions/{echoBoardSolutionId}")
    public ResponseEntity<EchoBoardSolution> getEchoBoardSolution(@PathVariable Long echoId, @PathVariable Long echoBoardSolutionId) {
        return ResponseEntity.of(echoService.getSolutionById(echoBoardSolutionId));
    }

    @PostMapping("{echoId}/solutions")
    public ResponseEntity<Long> saveEchoBoardSolution(@PathVariable Long echoId, @RequestBody EchoBoardSolution echoBoardSolution) {

        Optional<Long> echoBoardSolutionId = echoService.addSolutionToEcho(echoId, echoBoardSolution);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(echoBoardSolutionId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("{echoId}/solutions/{solutionId}/upvote")
    public ResponseEntity<Integer> upvoteSolution(@PathVariable long echoId, @PathVariable long solutionId) {
        return ResponseEntity.of(echoService.upvoteSolution(solutionId));
    }

    @PostMapping("{echoBoardId}/comments")
    public ResponseEntity<Void> addCommentToEchoBoard(@PathVariable long echoBoardId, @RequestBody EchoBoardComment echoBoardComment) {

        Optional<Long> commentId = echoService.addCommentToEcho(echoBoardId, echoBoardComment);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(commentId)
                .toUri();
        return ResponseEntity.created(location).build();
    }


    @DeleteMapping("/echoes/{id}")
    public ResponseEntity<EchoBoard> deleteEcho(@PathVariable long id) {
        echoService.deleteEcho(id);
        return ResponseEntity.accepted().build();
    }


}

