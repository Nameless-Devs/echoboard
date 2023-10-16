package util.mock;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.*;

public class WithMockOidcUserSecurityContextFactory implements WithSecurityContextFactory<WithMockOidcUser>{

    private final Faker fakeUser = new Faker();

    @Override
    public SecurityContext createSecurityContext(WithMockOidcUser customUser) {


        SecurityContext context = SecurityContextHolder.createEmptyContext();
        DefaultOidcUser oidcUser = createFakeUser(fakeUser.name());

        Authentication auth = UsernamePasswordAuthenticationToken
                .authenticated(oidcUser, "password", Collections.emptyList());

        context.setAuthentication(auth);
        return context;
    }

        private DefaultOidcUser createFakeUser(Name fakeUser) {

        String fakeUserName = fakeUser.firstName() + " " + fakeUser.lastName();

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", "mockUserSubject");
        attributes.put("name", fakeUserName);
        attributes.put("email", fakeUserName.replace(" ", "") + "@example.com");
        attributes.put("picture", null);
        OidcUserInfo userInfo = new OidcUserInfo(Collections.singletonMap("name", fakeUserName));
        OidcIdToken idToken = new OidcIdToken(createTokenValue(fakeUserName), null, null, attributes);

        return new DefaultOidcUser(Collections.emptyList(), idToken, userInfo);
    }

    private String createTokenValue(String fakeUserName) {

        JwtBuilder builder = Jwts.builder()
                .setSubject("mockUserSubject")
                .claim("name", fakeUserName)
                .claim("email", fakeUserName + "@example.com")
                .claim("picture", null)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600));

        return builder.compact();
    }
}
