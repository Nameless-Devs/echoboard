package se.salt.echoboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
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
        return webSocketService.saveMessage(message);
    }

    public List<Message> getChatHistory(Long chatRoomId) {
        return webSocketService.getChatHistory(chatRoomId);
    }

}
