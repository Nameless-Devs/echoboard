package se.salt.echoboard.security.config.dev;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import se.salt.echoboard.service.EchoBoardService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Profile({"dev", "test"})
public class MockUserAuthenticationFilter extends OncePerRequestFilter implements MockUserSecurityContextFactory{

    private final EchoBoardService service;

    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        DefaultOidcUser mockUser = createMockUser(request.getSession().getId());
        SecurityContextHolder.setContext(setMockUserInSecurityContext(mockUser));
        createUserIfTheyDoNotExist(mockUser);
        response.setHeader("Access-Control-Allow-Origin", baseUrl);
        filterChain.doFilter(request, response);
    }

    private void createUserIfTheyDoNotExist(DefaultOidcUser oidcUser) {
        if (service.getUserBySubject(oidcUser.getSubject()).isEmpty()) {
            service.createUser(oidcUser);
        }
    }

}

