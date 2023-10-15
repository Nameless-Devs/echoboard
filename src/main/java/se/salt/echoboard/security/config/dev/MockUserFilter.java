package se.salt.echoboard.security.config.dev;

import com.github.javafaker.Faker;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
import se.salt.echoboard.service.EchoBoardService;

import java.io.IOException;
import java.util.*;

@Component
@RequiredArgsConstructor
@Profile({"dev", "test"})
public class MockUserFilter extends OncePerRequestFilter {

    private final EchoBoardService service;

    @Value("${frontend-details.base-url}")
    private String baseUrl;
    private final Faker faker = new Faker();

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        OidcUser fakeUser = createFakeUser(request.getSession().getId());
        SecurityContextHolder.setContext(setFakeUserInSecurityContext(fakeUser));
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

    private OidcUser createFakeUser(String subject) {

        String fakeUserName = faker.name().firstName() + " " + faker.name().lastName();

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", subject);
        attributes.put("name", fakeUserName);
        attributes.put("email", fakeUserName.replace(" ", "") + "@example.com");
        attributes.put("picture", "https://source.unsplash.com/random/200x200");

        OidcIdToken idToken = new OidcIdToken(createTokenValue(subject, fakeUserName),
                null, null, attributes);
        return new DefaultOidcUser(Collections.emptyList(), idToken);
    }

    private String createTokenValue(String subject, String fakeUserName) {

        JwtBuilder builder = Jwts.builder()
                .setSubject(subject)
                .claim("name", fakeUserName)
                .claim("email", fakeUserName + "@example.com")
                .claim("picture", "https://source.unsplash.com/random/200x200")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600));

        return builder.compact();
    }

    private void createUserIfTheyDoNotExist(OidcUser oidcUser) {
        if (service.getUserBySubject(oidcUser.getSubject()).isEmpty()) {
            service.createUser(oidcUser);
        }
    }

}

