package se.salt.echoboard.security.config.dev;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTParser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import se.salt.echoboard.security.config.WebsiteProperties;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.io.IOException;
import java.text.ParseException;
import java.util.Arrays;
import java.util.Collections;

import static se.salt.echoboard.security.config.JwtValidation.JWT_TOKEN_COOKIE_NAME;
import static se.salt.echoboard.security.config.JwtValidation.getJwtTokenFromRequestCookie;


@Component
@RequiredArgsConstructor
@Slf4j
@Profile({"dev", "test"})
public class MockUserAuthenticationFilter extends OncePerRequestFilter implements MockUserSecurityContextFactory{


    private final EchoBoardUserRepository repository;
    private final WebsiteProperties websiteProperties;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        var jwtTokenString = getJwtTokenFromRequestCookie(request);

        if (request.getRequestURI().endsWith("/login")){
            response.sendRedirect(websiteProperties.frontend());
            return;
        }

        if (jwtTokenString.isPresent()) {
            log.info("Received JWT token: {}", jwtTokenString.get());
            JWT jwt;
            try {
                jwt =  JWTParser.parse(jwtTokenString.get());
                OidcUser user = createOidcUserFromJwt(jwt);
                createUserIfTheyDoNotExist(user);
                SecurityContextHolder.setContext(setMockUserInSecurityContext(user));
                log.info("Security Context is: " + SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            } catch (ParseException e) {
                log.error("Invalid JWT token: {}", jwtTokenString);
                response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            }

        } else {
            if (SecurityContextHolder.getContext().getAuthentication() != null){
                createUserIfTheyDoNotExist((OidcUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
                filterChain.doFilter(request, response);
                return;
            }
            if (request.getRequestURI().endsWith("chat")){
                return;
            }
            log.info("JWT not received");
            var user = createMockUser();
            repository.createUser(user);
            response.addCookie(createNewCookie(user.getIdToken().getTokenValue()));
        }
        filterChain.doFilter(request, response);
    }
    private Cookie createNewCookie(String tokenValue) {
        Cookie cookie = new Cookie(JWT_TOKEN_COOKIE_NAME, tokenValue);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(100000);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setDomain("localhost");
        return cookie;
    }

    private OidcUser createOidcUserFromJwt(JWT jwt) throws ParseException {
        OidcIdToken oidcIdToken =
                new OidcIdToken(Arrays.toString(jwt.getParsedParts()), null, null, jwt.getJWTClaimsSet().getClaims());
        return new DefaultOidcUser(Collections.emptyList(), oidcIdToken);
    }

    private void createUserIfTheyDoNotExist(OidcUser oidcUser) {
        if (repository.getUserBySubject(oidcUser.getSubject()).isEmpty()) {
            repository.createUser(oidcUser);
        }
    }

}

