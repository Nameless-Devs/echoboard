package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import se.salt.echoboard.model.Message;
import se.salt.echoboard.service.WebSocketService;


@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final WebSocketService webSocketService;

    @MessageMapping("/chat/sendMessage/{id}")
    @SendTo("/topic/chatrooms/{id}")
    public Message sendMessage(@Payload Message message,
                               @Header(value = "simpUser") Authentication user,
                               @DestinationVariable long id) {
        return webSocketService.saveMessageWithChatroom(message, user, id);
    }

//    @MessageMapping("/chat/sendMessage")
//    @SendTo("/topic/chatrooms")
//    public Message sendMessage(@Payload Message message,
//                               @Header(value = "simpUser") Authentication user) {
//        return webSocketService.saveMessageWithChatroom(message, user, 100);
//    }

//    public List<Message> getChatHistory(Long chatRoomId) {
//        return webSocketService.getChatHistory(chatRoomId);
//    }

}
