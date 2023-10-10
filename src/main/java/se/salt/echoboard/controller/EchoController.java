package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardResponseDto;
import se.salt.echoboard.controller.dto.EchoBoardSolutionResponseDto;
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
public class EchoController {

    private final EchoBoardService echoService;
    private final DTOConvertor convertor;

    @GetMapping("{id}")
    public ResponseEntity<EchoBoardResponseDto> getEcho(@PathVariable long id) {
        return ResponseEntity.of(echoService.getEchoById(id)
                .map(convertor::convertEntityToResponseDto));
    }

    @GetMapping
    public ResponseEntity<List<EchoBoardResponseDto>> getAllEchoes() {
        return ResponseEntity.ofNullable(echoService.findAll().stream()
                .map(convertor::convertEntityToResponseDto).toList());
    }

    @PatchMapping("{echoId}/upvote")
    public ResponseEntity<Integer> upvoteEcho(@PathVariable long echoId, @AuthenticationPrincipal OidcUser user) {
        return ResponseEntity.of(echoService.upvoteEcho(echoId, user.getSubject()));
    }

    @PatchMapping("{echoId}/comments/{commentId}/upvote")
    public ResponseEntity<Integer> upvoteComment(@PathVariable long echoId, @PathVariable long commentId,
                                                 @AuthenticationPrincipal OidcUser user) {
        return ResponseEntity.of(echoService.upvoteComment(commentId, user.getSubject()));
    }

    @PostMapping
    public ResponseEntity<Void> saveEcho(@RequestBody EchoBoard echoBoard, @AuthenticationPrincipal OidcUser user) {
        long echoId = echoService.saveEcho(echoBoard, user.getSubject()).getId();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(echoId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("{echoId}/solutions")
    public ResponseEntity<Void> saveEchoBoardSolution(@PathVariable long echoId,
                                                      @RequestBody EchoBoardSolution echoBoardSolution,
                                                      @AuthenticationPrincipal OidcUser user) {

        Optional<Long> id = echoService.addSolutionToEcho(echoId, echoBoardSolution, user.getSubject());

        if (id.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id.get())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("{echoBoardId}/comments")
    public ResponseEntity<Void> addCommentToEchoBoard(@PathVariable long echoBoardId,
                                                      @RequestBody EchoBoardComment echoBoardComment,
                                                      @AuthenticationPrincipal OidcUser user) {

        var id = echoService.addCommentToEcho(echoBoardId, echoBoardComment, user.getSubject());

        if (id.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id.get())
                .toUri();
        return ResponseEntity.created(location).build();
    }


    @DeleteMapping("{id}")
    public ResponseEntity<EchoBoard> deleteEcho(@PathVariable long id) {
        echoService.deleteEcho(id);
        return ResponseEntity.of(echoService.getEchoById(id));
    }


}

