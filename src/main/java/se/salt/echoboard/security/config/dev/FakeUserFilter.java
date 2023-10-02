package se.salt.echoboard.security.config.dev;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.io.IOException;
import java.util.*;

@Component
@RequiredArgsConstructor
@Profile({"dev", "test"})
public class FakeUserFilter extends OncePerRequestFilter {

    private final EchoBoardUserRepository userRepository;

    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        SecurityContextHolder.setContext(
                setFakeUserInSecurityContext(
                        createFakeUser(request.getSession().getId(),
                                "Fake User " + request.getSession().getId(),
                                "faker" + request.getSession().getId() +"@example.com")));
        response.setHeader("Access-Control-Allow-Origin", baseUrl);
        filterChain.doFilter(request, response);
    }

    private SecurityContext setFakeUserInSecurityContext(OidcUser fakeUser) {

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(fakeUser, null, fakeUser.getAuthorities());
        createUserIfTheyDoNotExist(fakeUser);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return SecurityContextHolder.getContext();
    }

    private OidcUser createFakeUser(String subject, String name, String email) {

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", subject);
        attributes.put("name", name);
        attributes.put("email", email);

        OidcIdToken idToken = new OidcIdToken(createTokenValue(subject, name, email), null, null, attributes);
        return new DefaultOidcUser(Collections.emptyList(), idToken);
    }

    private String createTokenValue(String subject, String name, String email) {

        JwtBuilder builder = Jwts.builder()
                .setSubject(subject)
                .claim("name", name)
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600));

        return builder.compact();
    }

    private void createUserIfTheyDoNotExist(OidcUser oidcUser) {
        if (userRepository.getUserBySubject(oidcUser.getSubject()).isEmpty()) {
            userRepository.createUser(oidcUser);
        }
    }

}

