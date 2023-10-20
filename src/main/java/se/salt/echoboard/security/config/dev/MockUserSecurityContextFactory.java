package se.salt.echoboard.security.config.dev;

import com.github.javafaker.Faker;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.core.context.SecurityContext;

import java.util.*;

public interface MockUserSecurityContextFactory {

    default SecurityContext setMockUserInSecurityContext(OidcUser mockUser) {
        Authentication auth = getAuthentication(mockUser);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        return context;
    }

    default UsernamePasswordAuthenticationToken getAuthentication(OidcUser mockUser) {
        return UsernamePasswordAuthenticationToken
                .authenticated(mockUser, "password", Collections.singleton((GrantedAuthority) () -> "USER"));
    }

    default DefaultOidcUser createMockUser() {
        Faker faker = new Faker();
        String subject = UUID.randomUUID().toString();
        return getDefaultOidcUser(subject, faker);
    }

    default DefaultOidcUser createMockUser(String userSubject) {
        Faker faker = new Faker();
        return getDefaultOidcUser(userSubject, faker);
    }

    private DefaultOidcUser getDefaultOidcUser(String userSubject, Faker faker) {
        String mockUserName = faker.name().firstName() + " " + faker.name().lastName();

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", userSubject);
        attributes.put("name", mockUserName);
        attributes.put("email", mockUserName + "@example.com");
        attributes.put("picture", "https://picsum.photos/id/"+generateRandomNumber()+"/200");
        OidcUserInfo mockUserInfo = new OidcUserInfo(Collections.singletonMap("name", mockUserName));
        OidcIdToken idToken = new OidcIdToken(createTokenValue(userSubject, mockUserName), null, null, attributes);

        return new DefaultOidcUser(Collections.emptyList(), idToken, mockUserInfo);
    }

    private String createTokenValue(String subject, String mockUserName) {

        JwtBuilder builder = Jwts.builder()
                .setSubject(subject)
                .claim("name", mockUserName)
                .claim("email", mockUserName + "@example.com")
                .claim("picture", null)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600));

        return builder.compact();
    }

    private int generateRandomNumber() {
        return new Random().nextInt(200) + 1;
    }

}
