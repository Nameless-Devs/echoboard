package se.salt.echoboard.security.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;

@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    @Value("${frontend-details.base-url}")
    private String baseUrl;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        logout(request, response);
        response.sendRedirect(baseUrl+"/home");

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
        response.addCookie(cookie);
    }
}
