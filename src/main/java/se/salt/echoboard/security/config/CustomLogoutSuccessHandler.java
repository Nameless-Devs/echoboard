package se.salt.echoboard.security.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;

@Slf4j
@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        try {
            logout(request, response);
            log.info("Logout successful. Redirecting to the homepage.");
            response.sendRedirect(baseUrl + "/home");
        } catch (IOException e) {
            log.error("Error redirecting after logout", e);
        }

    }

    public void logout(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response) {
        boolean isSecure = false;
        String contextPath = null;
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        isSecure = request.isSecure();
        contextPath = request.getContextPath();

        SecurityContext context = SecurityContextHolder.getContext();
        SecurityContextHolder.clearContext();
        context.setAuthentication(null);

        deleteCookie("JSESSIONID", isSecure, response, contextPath);
        deleteCookie("JwtToken", isSecure, response, contextPath);

    }

    private void deleteCookie(String cookieName, boolean isSecure,
                                     HttpServletResponse response, String contextPath) {
        String cookiePath = StringUtils.hasText(contextPath) ? contextPath : "/";

        Cookie cookie = new Cookie(cookieName, null);
        cookie.setPath(cookiePath);
        cookie.setMaxAge(0);
        cookie.setSecure(isSecure);
        log.info("Deleting cookie - Name: {}, Path: {}, Max Age: {}, Secure: {}",
                cookie.getName(), cookie.getPath(), cookie.getMaxAge(), cookie.getSecure());
        response.addCookie(cookie);
    }
}
