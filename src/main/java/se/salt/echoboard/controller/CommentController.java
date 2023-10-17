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

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final EchoBoardService echoService;

    @GetMapping("{commentId}")
    @ResponseStatus(OK)
    public EchoBoardCommentResponseDTO getCommentById(@PathVariable long commentId) {
        return echoService.getCommentById(commentId);
    }

    @PatchMapping("{commentId}/upvote")
    @ResponseStatus(OK)
    public Integer upvoteComment(@PathVariable long commentId, @AuthenticationPrincipal OidcUser user) {
        return echoService.upvoteComment(commentId, user.getSubject());
    }


    @PostMapping("{commentId}")
    @ResponseStatus(CREATED)
    public EchoBoardCommentResponseDTO addCommentToEchoBoardComment(@PathVariable long commentId,
                                                                              @RequestBody EchoBoardComment echoBoardComment,
                                                                              @AuthenticationPrincipal OidcUser user) {
        return echoService.addCommentToComment(commentId, echoBoardComment, user.getSubject());
    }
}
