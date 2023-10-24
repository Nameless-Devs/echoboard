package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import se.salt.echoboard.model.Message;
import se.salt.echoboard.service.WebSocketService;

import java.time.Instant;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final WebSocketService webSocketService;

    @MessageMapping("/chat/sendMessage")
    @SendTo("/topic/chatrooms")
    public Message sendMessage(@Payload Message message, @Header(value = "simpUser") Authentication user) {
        if (message.getContent() == null || message.getContent().isEmpty()) {
            throw new IllegalArgumentException("Message content cannot be null or empty");
        }
        log.info("User: "+ user + "sent a message");
        return webSocketService.saveMessage(Message.builder()
                .content(message.getContent())
                .sender(user.getName())
                .picture(message.getPicture())
                        .timestamp(Instant.now())
                .build());
    }
    public List<Message> getChatHistory(Long chatRoomId) {
        return webSocketService.getChatHistory(chatRoomId);
    }

}
