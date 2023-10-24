package se.salt.echoboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.salt.echoboard.model.Message;
import se.salt.echoboard.service.repository.JPAChatRoomRepository;
import se.salt.echoboard.service.repository.JPAMessageRepository;

import java.util.List;

@Service
public class WebSocketService {

    @Autowired
    private JPAChatRoomRepository JPAChatRoomRepository;

    @Autowired
    private JPAMessageRepository JPAMessageRepository;

    public Message saveMessage(Message message) {
        return JPAMessageRepository.save(message);
    }

    //fix once we have multiple rooms
    public List<Message> getChatHistory(Long chatRoomId) {
        return JPAMessageRepository.findByChatRoomId(chatRoomId);
    }

    public List<Message> getAllMessages() {
        return JPAMessageRepository.findAll();
    }

}
