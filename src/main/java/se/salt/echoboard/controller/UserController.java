package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.salt.echoboard.controller.dto.EchoBoardUserResponseDTO;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.EchoBoardService;


@RestController
@AllArgsConstructor
@RequestMapping("api/user")
public class UserController {

    private final EchoBoardService echoBoardService;

    @GetMapping
    public ResponseEntity<EchoBoardUserResponseDTO> getUser(@AuthenticationPrincipal OidcUser user) {
        return ResponseEntity.of(echoBoardService.getUserBySubject(user.getSubject()));
    }


    @GetMapping("mocked")
    public ResponseEntity<EchoBoardUser> getMockedUser() {
        EchoBoardUser user = EchoBoardUser.builder().name("Mikey Tester")
                .subject("12345")
                .email("mikey.mike@gmail.com")
                .picture("https://lh3.googleusercontent.com/a/ACg8ocLAWnojfjPfMGVFs7PIJYrZjGtH_c4uHmIKOzXW29NT=s96-c")
                .build();
        return ResponseEntity.ok(user);
    }
}
