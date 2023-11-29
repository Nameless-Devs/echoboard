package se.salt.echoboard.security.config.deploy;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import se.salt.echoboard.security.config.JwtValidation;
import se.salt.echoboard.security.config.WebsiteProperties;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Profile({"deploy"})
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final EchoBoardUserRepository userRepository;
    private final JwtValidation jwtValidation;
    private final WebsiteProperties websiteProperties;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();

        try {
            jwtValidation.validateJWTString(oidcUser.getIdToken().getTokenValue());
        } catch (JwtException e) {
            response.sendRedirect(websiteProperties.frontend()+"login");
        }
        createUserIfTheyDoNotExist(oidcUser);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.addCookie(createNewCookie(oidcUser.getIdToken().getTokenValue()));
        response.sendRedirect(websiteProperties.frontend());
    }

    private void createUserIfTheyDoNotExist(OidcUser oidcUser) {
        if (userRepository.getUserBySubject(oidcUser.getSubject()).isEmpty()) {
            userRepository.createUser(oidcUser);
        }
    }

    private Cookie createNewCookie(String tokenValue) {
        Cookie cookie = new Cookie("JwtToken", tokenValue);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(3500);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setDomain(getDomain(websiteProperties.frontend()));
        return cookie;
    }

    private String getDomain(String url) {
        if ("https://app.echoboard.site/".equals(url)) {
            return "echoboard.site";
        }
        return "localhost";
    }
}
