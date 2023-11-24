package se.salt.echoboard.tenant;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

public class TenantResolver {



    public static String resolve() {
        var context = SecurityContextHolder.getContext();

        if (context.getAuthentication() instanceof OAuth2AuthenticationToken) {
            var token = (OidcUser) context.getAuthentication().getPrincipal();
            return  token.getClaim("email");

        }
        return null;
    }

}
