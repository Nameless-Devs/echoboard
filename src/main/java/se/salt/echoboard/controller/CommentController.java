package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.salt.echoboard.service.EchoBoardService;

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
}
