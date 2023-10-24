package se.salt.echoboard.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
//@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic/chatrooms");
        registry.setApplicationDestinationPrefixes("/app");
        }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/w")
//                .addInterceptors(httpSessionHandshakeInterceptor())
                .setAllowedOrigins("http://localhost:3000");

    }

//    @Bean
//    public HandshakeInterceptor httpSessionHandshakeInterceptor() {
//        return new HandshakeInterceptor() {
//            @Override
//            public boolean beforeHandshake(@NonNull ServerHttpRequest request,
//                                           @NonNull ServerHttpResponse response,
//                                           @NonNull WebSocketHandler wsHandler,
//                                           @NonNull Map<String, Object> attributes) {
//                log.info(String.valueOf(request.getPrincipal()));
//                if (request instanceof ServletServerHttpRequest servletServerRequest) {
//                    HttpServletRequest servletRequest = servletServerRequest.getServletRequest();
//                    Cookie token = WebUtils.getCookie(servletRequest, "JwtToken");
//                    assert token != null;
//                    log.info("Cookie with value in Http Session Handshake: " + token.getValue());
//                    attributes.put("JwtToken", token.getValue());
//                    SecurityContextHolder.getContext().setAuthentication((Authentication) request.getPrincipal());
//                }
//                return true;
//            }
//            @Override
//            public void afterHandshake(ServerHttpRequest request,
//                                       ServerHttpResponse response,
//                                       WebSocketHandler wsHandler,
//                                       Exception exception) {
//            }
//        };
//    }
//
//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(
//        new ChannelInterceptor() {
//            @Override
//            public Message<?> preSend(Message<?> message, MessageChannel channel) {
//                StompHeaderAccessor accessor =
//                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
////                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
//                    log.info(String.valueOf(accessor.getUser()));
////                }
////                System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
//                SecurityContextHolder.getContext().setAuthentication((Authentication) accessor.getUser());
//
//                return message;
//            }
//        });
//    }

}
