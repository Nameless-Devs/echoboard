package se.salt.echoboard.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardUserResponseDto;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;


@RestController
@AllArgsConstructor
@RequestMapping("api")
public class UserController {

    private final EchoBoardUserRepository userRepository;
    private final DTOConvertor convert;

    @GetMapping("user")
    public ResponseEntity<EchoBoardUserResponseDto> getUser(@AuthenticationPrincipal OidcUser user) {
        var echoBoardUser = userRepository.getUserBySubject(user.getSubject());
        return ResponseEntity.of(echoBoardUser.map(convert::convertEntityToResponseDto));
    }
}
