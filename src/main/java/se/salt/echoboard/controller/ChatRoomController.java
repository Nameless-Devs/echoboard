package se.salt.echoboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.salt.echoboard.model.Message;
import se.salt.echoboard.service.WebSocketService;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    @Autowired
    private WebSocketService webSocketService;

    @GetMapping
    public List<Message> getAllMessages(){
        return webSocketService.getAllMessages();
    }
}
