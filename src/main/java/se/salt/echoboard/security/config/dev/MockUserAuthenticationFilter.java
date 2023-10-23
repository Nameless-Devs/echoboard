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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.io.IOException;
import java.text.ParseException;
import java.util.Arrays;
import java.util.Collections;

import static se.salt.echoboard.security.config.JwtValidation.*;


@Component
@RequiredArgsConstructor
@Slf4j
@Profile({"dev", "test"})
public class MockUserAuthenticationFilter extends OncePerRequestFilter implements MockUserSecurityContextFactory{

    private final EchoBoardService service;
    private JWTParser parser;


    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        var jwtTokenString = getJwtTokenFromRequestCookie(request);

        if (jwtTokenString.isPresent()) {
            log.info("Received JWT token: {}", jwtTokenString.get());
            JWT jwt;
            try {
                jwt =  JWTParser.parse(jwtTokenString.get());
                OidcUser user = createOidcUserFromJwt(jwt);
                createUserIfTheyDoNotExist(user)
                SecurityContextHolder.setContext(setMockUserInSecurityContext(user));
                log.info(String.valueOf(jwt));
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }

        } else {
            log.info("JWT not received");
            var user = createMockUser();
            service.createUser(user);
            response.addCookie(createNewCookie(user.getIdToken().getTokenValue()));
        }
        filterChain.doFilter(request, response);
    }
    private Cookie createNewCookie(String tokenValue) {
        Cookie cookie = new Cookie("JwtToken", tokenValue);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(3500);
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
  
    private void createUserIfTheyDoNotExist(DefaultOidcUser oidcUser) {
        if (repository.getUserBySubject(oidcUser.getSubject()).isEmpty()) {
            repository.createUser(oidcUser);
        }
    }

}

