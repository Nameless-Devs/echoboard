package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.EchoBoardCommentResponseDTO;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.service.EchoBoardService;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final EchoBoardService echoService;

    @GetMapping("{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<EchoBoardCommentResponseDTO> getCommentById(@PathVariable long commentId) {
        return ResponseEntity.of(echoService.getCommentById(commentId));
    }

    @PatchMapping("{commentId}/upvote")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Integer> upvoteComment(@PathVariable long commentId, @AuthenticationPrincipal OidcUser user) {
        return ResponseEntity.of(echoService.upvoteComment(commentId, user.getSubject()));
    }


    @PostMapping("{commentId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<EchoBoardCommentResponseDTO> addCommentToEchoBoardComment(@PathVariable long commentId,
                                                                              @RequestBody EchoBoardComment echoBoardComment,
                                                                              @AuthenticationPrincipal OidcUser user) {
        return echoService.addCommentToComment(commentId, echoBoardComment, user.getSubject());
    }
}
