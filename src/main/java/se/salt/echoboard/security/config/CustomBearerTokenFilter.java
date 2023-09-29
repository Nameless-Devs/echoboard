package se.salt.echoboard.security.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import se.salt.echoboard.security.JwtValidation;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

@Component
@AllArgsConstructor
@Profile("deploy")
public class CustomBearerTokenFilter extends OncePerRequestFilter {

    private final JwtValidation validation;
    private static final String JWT_TOKEN_COOKIE_NAME = "JwtToken";

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        var jwtTokenString = getJwtTokenFromRequest(request);

        if (jwtTokenString.isPresent()) {
            try {
                Jwt jwt = validation.decodeValidateJWT(jwtTokenString.get());
                OidcUser user = createOidcUserFromJwt(jwt);
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));
            } catch (JwtException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: " + e.getMessage());
                System.out.println(e.getMessage());
                return;
            }
        }
        filterChain.doFilter(request, response);

    }

    private Optional<String> getJwtTokenFromRequest(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
                .filter(cookie -> JWT_TOKEN_COOKIE_NAME.equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue);
    }

    private OidcUser createOidcUserFromJwt(Jwt jwt) {
        OidcIdToken oidcIdToken = new OidcIdToken(jwt.getTokenValue(), jwt.getIssuedAt(), jwt.getExpiresAt(), jwt.getClaims());
        return new DefaultOidcUser(Collections.emptyList(), oidcIdToken);
    }
}
