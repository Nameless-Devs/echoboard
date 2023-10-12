package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.service.EchoBoardService;

import java.net.URI;

@RestController
@RequestMapping("api/comments")
@AllArgsConstructor
public class CommentController {

    private final EchoBoardService echoService;

    @GetMapping("{commentId}")
    public ResponseEntity<EchoBoardComment> getCommentById(@PathVariable long commentId) {
        return ResponseEntity.of(echoService.getCommentById(commentId));
    }

    @PatchMapping("{commentId}/upvote")
    public ResponseEntity<Integer> upvoteComment(@PathVariable long commentId, @AuthenticationPrincipal OidcUser user) {
        return ResponseEntity.of(echoService.upvoteComment(commentId, user.getSubject()));
    }

    @PostMapping("{commentId}")
    public ResponseEntity<Void> addCommentToEchoBoardComment(@PathVariable long commentId,
                                                      @RequestBody EchoBoardComment echoBoardComment,
                                                      @AuthenticationPrincipal OidcUser user) {

        var id = echoService.addCommentToComment(commentId, echoBoardComment, user.getSubject()).getId();

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/comments")
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(location).build();
    }

}
