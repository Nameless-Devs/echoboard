package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import se.salt.echoboard.controller.dto.EchoBoardDTO;
import se.salt.echoboard.controller.dto.EchoBoardUserResponse;
import se.salt.echoboard.service.EchoBoardService;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{subject}/echoboard")
    public ResponseEntity<List<EchoBoardDTO>> getEchoBoardWithCommentsAndSolutions (@AuthenticationPrincipal OidcUser user) {
        var echoBoardUser = echoBoardService.getEchoBoardUserWithCommentsAndSolutions(user.getSubject());
        return ResponseEntity.of(Optional.ofNullable(echoBoardUser));
    }
}
