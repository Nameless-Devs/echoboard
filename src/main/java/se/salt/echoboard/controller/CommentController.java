package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.EchoBoardCommentResponse;
import se.salt.echoboard.controller.dto.EchoBoardPreview;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.service.EchoBoardService;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final EchoBoardService echoService;

    @GetMapping("{commentId}")
    @ResponseStatus(OK)
    public EchoBoardCommentResponse getCommentById(@PathVariable long commentId) {
        return echoService.getCommentById(commentId);
    }

    @PatchMapping("{commentId}/upvote")
    @ResponseStatus(OK)
    public Integer upvoteComment(@PathVariable long commentId, @AuthenticationPrincipal OidcUser user) {
        return echoService.upvoteComment(commentId, user.getSubject());
    }


    @PostMapping("{commentId}")
    @ResponseStatus(CREATED)
    public EchoBoardCommentResponse addCommentToEchoBoardComment(@PathVariable long commentId,
                                                                 @RequestBody EchoBoardComment echoBoardComment,
                                                                 @AuthenticationPrincipal OidcUser user) {
        return echoService.addCommentToComment(commentId, echoBoardComment, user.getSubject());
    }

    @GetMapping("/{commentId}/echoboard")
    @ResponseStatus(OK)
    public EchoBoardPreview getEchoBoardByCommentId(@PathVariable long commentId){
        return echoService.getEchoBoardByCommentId(commentId);
    }

    @DeleteMapping("{commentId}")
    @ResponseStatus(NO_CONTENT)
    public EchoBoardCommentResponse deleteSolution(@PathVariable long commentId){
        echoService.deleteComment(commentId);
        return echoService.getCommentById(commentId);
    }
}
