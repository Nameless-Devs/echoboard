package se.salt.echoboard.websocket;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.ietf.jgss.Oid;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.util.WebUtils;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic/chatrooms");
        registry.setApplicationDestinationPrefixes("/app");
        }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/w")
                .setAllowedOrigins("http://localhost:3000");
    }

    //TODO make this more readable
    @Bean
    public HandshakeInterceptor httpSessionHandshakeInterceptor() {
        return new HandshakeInterceptor() {
            @Override
            public boolean beforeHandshake(@NonNull ServerHttpRequest request,
                                           @NonNull ServerHttpResponse response,
                                           @NonNull WebSocketHandler wsHandler,
                                           @NonNull Map<String, Object> attributes) {
                if (request instanceof ServletServerHttpRequest servletServerRequest) {
                    HttpServletRequest servletRequest = servletServerRequest.getServletRequest();
                    Cookie token = WebUtils.getCookie(servletRequest, "JwtToken");
                    log.info("Cookie with value: " + token);
                    assert token != null;
                    attributes.put("JwtToken", token.getValue());
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

    //TODO make this more readable
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(
        new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
//                    Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
//                    List<String> authorization = accessor.getNativeHeader("Authorization");
                    Principal user = (Principal) accessor.getHeader("simpUser");
                    accessor.setUser( user);
                    log.info(String.valueOf(user));
                }

                return message;
            }
        });
    }

}
