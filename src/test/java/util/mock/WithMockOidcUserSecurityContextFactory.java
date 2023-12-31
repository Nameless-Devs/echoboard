package util.mock;


import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.test.context.support.WithSecurityContextFactory;
import se.salt.echoboard.security.config.dev.MockUserSecurityContextFactory;

public class WithMockOidcUserSecurityContextFactory
        implements WithSecurityContextFactory<WithMockOidcUser>, MockUserSecurityContextFactory {

    @Override
    public SecurityContext createSecurityContext(WithMockOidcUser customUser) {

        DefaultOidcUser mockUser = createMockUser();
        return setMockUserInSecurityContext(mockUser);
    }
}
