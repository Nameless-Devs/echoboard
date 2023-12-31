package se.salt.echoboard.websocket;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.util.WebUtils;
import se.salt.echoboard.multitenancy.context.TenantContext;
import se.salt.echoboard.security.config.WebsiteProperties;

import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WebsiteProperties websiteProperties;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic/chatrooms");
        registry.setApplicationDestinationPrefixes("/app");
        }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/w")
                .addInterceptors(httpSessionHandshakeInterceptor())
                .setAllowedOrigins(websiteProperties.frontend());

    }

    @Bean
    public HandshakeInterceptor httpSessionHandshakeInterceptor() {
        return new HandshakeInterceptor() {
            @Override
            public boolean beforeHandshake(@NonNull ServerHttpRequest request,
                                           @NonNull ServerHttpResponse response,
                                           @NonNull WebSocketHandler wsHandler,
                                           @NonNull Map<String, Object> attributes) {
                log.trace("""
                    --------------------------------------------------------------------------------------------------------
                    HandshakeInterceptor started
                    --------------------------------------------------------------------------------------------------------
                    """);

                log.info(String.valueOf(request.getPrincipal()));
                if (request instanceof ServletServerHttpRequest servletServerRequest) {
                    HttpServletRequest servletRequest = servletServerRequest.getServletRequest();
                    log.info(String.valueOf(WebUtils.getCookie(servletRequest, "JSESSIONID")));
                    Cookie token = WebUtils.getCookie(servletRequest, "JwtToken");
                    assert token != null;
                    log.info("Cookie with value in Http Session Handshake: " + token.getValue());
                    attributes.put("JwtToken", token.getValue());
                    SecurityContextHolder.getContext().setAuthentication((Authentication) request.getPrincipal());
                }
                return true;
            }
            @Override
            public void afterHandshake(ServerHttpRequest request,
                                       ServerHttpResponse response,
                                       WebSocketHandler wsHandler,
                                       Exception exception) {
            }
        };
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(
        new ChannelInterceptor() {

            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                log.trace("""
                    --------------------------------------------------------------------------------------------------------
                    Channel interceptor started
                    --------------------------------------------------------------------------------------------------------
                    """);
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                assert accessor != null;
                var user = (OAuth2AuthenticationToken) accessor.getUser();
                assert user != null;
                TenantContext.setTenantId(user.getPrincipal().getAttribute("hd"));
                log.info(String.valueOf(accessor.getUser()));
                SecurityContextHolder.getContext().setAuthentication((Authentication) accessor.getUser());

                return message;
            }
        });
    }

}
