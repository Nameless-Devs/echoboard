package se.salt.echoboard.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@AllArgsConstructor
@Profile({"deploy"})
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final EchoBoardUserRepository userRepository;

    private final JwtValidation jwtValidation;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        Object principal = authentication.getPrincipal();
//        String BASE_URL = "https://echoboard.vercel.app/";
        String BASE_URL = "http://localhost:3000/";

        if (principal instanceof OidcUser oidcUser) {

            jwtValidation.validateJwt(oidcUser.getIdToken().getTokenValue());


            var user =  userRepository.getUserByJwtId(oidcUser.getSubject());
            if (user.isEmpty()) {
                userRepository.createUser(oidcUser);
            }

            String redirectUrl =  BASE_URL + "?token=" +
                    URLEncoder.encode(oidcUser.getIdToken().getTokenValue(), StandardCharsets.UTF_8);
            response.sendRedirect(redirectUrl);
            
        }
    }

}
