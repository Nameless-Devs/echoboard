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
        request.getSession().invalidate();
        Cookie JwtToken = new Cookie("JwtToken", null);
        JwtToken.setMaxAge(0);
        response.addCookie(JwtToken);
        response.sendRedirect(baseUrl+"/home");
    }
}
