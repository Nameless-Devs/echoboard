package se.salt.echoboard.security.config.deploy;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import se.salt.echoboard.security.config.JwtValidation;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.io.IOException;

import static se.salt.echoboard.security.config.JwtValidation.createOidcUserFromJwt;
import static se.salt.echoboard.security.config.JwtValidation.getJwtTokenFromRequestCookie;

@Component
@RequiredArgsConstructor
@Slf4j
@Profile("deploy")
public class JwtCookieAuthenticationFilter extends OncePerRequestFilter {

    private final JwtValidation validation;
    private final EchoBoardUserRepository userRepository;
    @Value("${backend-details.base-url}")
    private String baseUrl;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        var jwtTokenString = getJwtTokenFromRequestCookie(request);
        if (shouldSkipFilter(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        if (jwtTokenString.isPresent()) {
            processJwtToken(jwtTokenString.get(), response);

        }
        filterChain.doFilter(request, response);
    }

    private boolean shouldSkipFilter(HttpServletRequest request) {
        return request.getRequestURI().equals("/login");
    }

    private void processJwtToken(String jwtTokenString, HttpServletResponse response) throws IOException {
        log.info("Received JWT token");
        log.trace("Received JWT token: {}", jwtTokenString);

        try {
            Jwt jwt = validation.validateJWTString(jwtTokenString);
            OidcUser user = createOidcUserFromJwt(jwt);
            redirectUserWithNoRegisteredAccountOtherWiseSetAuthenticated(user, response);
        } catch (JwtException e) {
            handleJwtException(e, response);
        }
    }

    private void redirectUserWithNoRegisteredAccountOtherWiseSetAuthenticated
            (OidcUser user, HttpServletResponse response) throws IOException {
        var echoBoardUser = userRepository.getUserBySubject(user.getSubject());
        if (echoBoardUser.isEmpty()) {
            response.sendRedirect(baseUrl + "login");
            return;
        }
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));
    }

    private void handleJwtException(JwtException e, HttpServletResponse response) throws IOException {
        log.error("Failed to validate JWT token: {}", e.getMessage());
        response.sendRedirect(baseUrl + "login");
    }
}
