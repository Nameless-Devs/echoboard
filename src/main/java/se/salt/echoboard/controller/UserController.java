package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import se.salt.echoboard.controller.dto.EchoBoardUserInfo;
import se.salt.echoboard.controller.dto.EchoBoardUserResponse;
import se.salt.echoboard.service.EchoBoardService;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final EchoBoardService echoBoardService;

    @GetMapping
    @ResponseStatus(OK)
    public EchoBoardUserResponse getUser(@AuthenticationPrincipal OidcUser user) {
        return echoBoardService.getUserBySubject(user.getSubject());
    }

    @GetMapping("/echoboard")
    @ResponseStatus(OK)
    public EchoBoardUserInfo getEchoBoardWithCommentsAndSolutions (@AuthenticationPrincipal OidcUser user) {
        return echoBoardService.getEchoBoardUserWithCommentsAndSolutions(user.getSubject());
    }

}
