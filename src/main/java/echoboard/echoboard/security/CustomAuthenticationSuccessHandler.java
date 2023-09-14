package echoboard.echoboard.security;

import echoboard.echoboard.security.JwtValidation;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtValidation jwtValidation;

    public CustomAuthenticationSuccessHandler(JwtValidation jwtValidation){
        this.jwtValidation = jwtValidation;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        Object principal = authentication.getPrincipal();
        String BASE_URL = "http://localhost:3000/?token=";

        if (principal instanceof OidcUser oidcUser) {

            jwtValidation.validateJwt(oidcUser);
            String redirectUrl =  BASE_URL +
                    URLEncoder.encode(oidcUser.getIdToken().getTokenValue(), StandardCharsets.UTF_8);
            response.sendRedirect(redirectUrl);
        }

        System.out.println("Principal is not an instance of OidcUser.");

    }

}
