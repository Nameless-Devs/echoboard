package se.salt.echoboard.security.config.dev;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
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
import se.salt.echoboard.service.repository.EchoBoardUserRepository;

import java.io.IOException;
import java.util.*;

@Component
@RequiredArgsConstructor
@Profile({"dev", "test"})
public class FakeUserFilter extends OncePerRequestFilter {

    private final EchoBoardUserRepository userRepository;
    private final Faker fakeUser = new Faker();

    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        SecurityContextHolder.setContext(
                setFakeUserInSecurityContext(
                        createFakeUser(request.getSession().getId(), fakeUser.name(),
                                "https://picsum.photos/id/"+generateRandomNumber()+"/200")));
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

    private OidcUser createFakeUser(String subject, Name fakeUser, String picture) {

        String fakeUserName = fakeUser.firstName()+ " "+ fakeUser.lastName() ;

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", subject);
        attributes.put("name", fakeUserName);
        attributes.put("email", fakeUserName.replace(" ", "") + "@example.com");
        attributes.put("picture", picture);

        OidcIdToken idToken = new OidcIdToken(createTokenValue(subject, fakeUserName, picture), null, null, attributes);
        return new DefaultOidcUser(Collections.emptyList(), idToken);
    }

    private String createTokenValue(String subject, String fakeUserName, String picture) {

        JwtBuilder builder = Jwts.builder()
                .setSubject(subject)
                .claim("name", fakeUserName)
                .claim("email", fakeUserName + "@example.com")
                .claim("picture", picture)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600));

        return builder.compact();
    }

    private void createUserIfTheyDoNotExist(OidcUser oidcUser) {
        if (userRepository.getUserBySubject(oidcUser.getSubject()).isEmpty()) {
            userRepository.createUser(oidcUser);
        }
    }

    public static int generateRandomNumber() {
        Random random = new Random();
        return random.nextInt(200) + 1;
    }


}

