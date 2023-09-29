package se.salt.echoboard.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


@Component
@RequiredArgsConstructor
@Profile({"deploy"})
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final EchoBoardUserRepository userRepository;

    private final JwtValidation jwtValidation;

    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();

            try {
                jwtValidation.validateJwt(oidcUser.getIdToken().getTokenValue());
                System.out.println(oidcUser.getIdToken().getTokenValue());
            } catch ( JwtException e) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
            }
            if (userRepository.getUserBySubject(oidcUser.getSubject()).isEmpty()) {
                userRepository.createUser(oidcUser);
            }
            response.addCookie(createNewCookie(oidcUser.getIdToken().getTokenValue()));
            response.sendRedirect(baseUrl);
    }

    private Cookie createNewCookie(String tokenValue) {
        Cookie cookie = new Cookie("JwtToken", tokenValue);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(3500);
        cookie.setSecure(true);
        cookie.setPath("/");
//        cookie.setDomain("localhost");
        return cookie;
    }

}
