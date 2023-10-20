package se.salt.echoboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import se.salt.echoboard.model.Message;
import se.salt.echoboard.service.WebSocketService;

import java.util.List;

@Controller
public class ChatController {

    @Autowired
    private WebSocketService webSocketService;

    @MessageMapping("/chat/sendMessage")
    @SendTo("/topic/chatrooms")
    public Message sendMessage(@Payload Message message) {
        if (message.getContent() == null || message.getContent().isEmpty()) {
            throw new IllegalArgumentException("Message content cannot be null or empty");
        }

//        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return webSocketService.saveMessage(message);
    }
    public List<Message> getChatHistory(Long chatRoomId) {
        return webSocketService.getChatHistory(chatRoomId);
    }

}
