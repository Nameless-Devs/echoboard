package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import se.salt.echoboard.model.Message;
import se.salt.echoboard.service.WebSocketService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final WebSocketService webSocketService;

    @MessageMapping("/chat/sendMessage")
    @SendTo("/topic/chatrooms")
    public Message sendMessage(@Payload Message message, @Header(value = "simpUser") Object user) {
        if (message.getContent() == null || message.getContent().isEmpty()) {
            throw new IllegalArgumentException("Message content cannot be null or empty");
        }


        log.info(String.valueOf(user));

//        DefaultOidcUser user1 = (DefaultOidcUser) user;
//        log.info(String.valueOf(user1));
//        log.info(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        return webSocketService.saveMessage(message);
    }
    public List<Message> getChatHistory(Long chatRoomId) {
        return webSocketService.getChatHistory(chatRoomId);
    }

}
