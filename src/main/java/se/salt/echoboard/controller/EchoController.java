package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardResponseDto;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.EchoBoardService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/echoes")
@AllArgsConstructor
public class EchoController {

    private final EchoBoardService echoService;
    private final DTOConvertor convertor;

    @GetMapping("{echoId}")
    public ResponseEntity<EchoBoardResponseDto> getEcho(@PathVariable long echoId) {
        return ResponseEntity.of(echoService.getEchoById(echoId)
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

    @PostMapping
    public ResponseEntity<Void> saveEcho(@RequestBody EchoBoard echoBoard, @AuthenticationPrincipal OidcUser user) {
        var id = echoService.saveEcho(echoBoard, user.getSubject());
        if (id.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("{echoId}/solutions")
    public ResponseEntity<Void> addSolutionToEchoBoard(@PathVariable long echoId,
                                                      @RequestBody EchoBoardSolution echoBoardSolution,
                                                      @AuthenticationPrincipal OidcUser user) {
        var id = echoService.addSolutionToEcho(echoId, echoBoardSolution, user.getSubject());
        if (id.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id.get())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("{echoId}/comments")
    public ResponseEntity<Void> addCommentToEchoBoard(@PathVariable long echoId,
                                                      @RequestBody EchoBoardComment echoBoardComment,
                                                      @AuthenticationPrincipal OidcUser user) {
        var id = echoService.addCommentToEcho(echoId, echoBoardComment, user.getSubject());
        if (id.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id.get())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("{echoId}")
    public ResponseEntity<EchoBoard> deleteEcho(@PathVariable long echoId) {
        echoService.deleteEcho(echoId);
        return ResponseEntity.of(echoService.getEchoById(echoId));
    }
}

