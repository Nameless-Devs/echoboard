package se.salt.echoboard.security.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

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
