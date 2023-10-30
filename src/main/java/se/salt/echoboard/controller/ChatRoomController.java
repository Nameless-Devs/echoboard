package se.salt.echoboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import se.salt.echoboard.controller.dto.EchoBoardUserResponse;
import se.salt.echoboard.model.Message;
import se.salt.echoboard.service.WebSocketService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRoomController {

    private final WebSocketService webSocketService;

    @GetMapping
    public List<Message> getAllMessages(){
        return webSocketService.getAllMessages();
    }

    @GetMapping("{chatroomId}/volunteers")
    @ResponseStatus(OK)
    public List<EchoBoardUserResponse> getListOfVolunteersForChatRoom(@PathVariable long chatroomId) {
        return webSocketService.getListOfVolunteers(chatroomId);
    }

}
