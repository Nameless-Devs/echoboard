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

    public Message saveMessageWithChatroom(Message message, Authentication user, long chatRoomId) {
        log.info("User: "+ user + "sent a message");
        if (message.getContent() == null || message.getContent().isEmpty()) {
            throw new IllegalArgumentException("Message content cannot be null or empty");
        }
        var chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow();
        var echoboardUser = userRepository.getUserBySubject(user.getName()).orElseThrow(UserNotFoundException::new);
        return messageRepository.save(message
                        .setPicture(echoboardUser.getPicture())
                        .setSender(echoboardUser.getName())
                .setChatRoom(chatRoom));
    }

    //fix once we have multiple rooms
    public List<Message> getChatHistory(Long chatRoomId) {
        return JPAMessageRepository.findByChatRoomId(chatRoomId);
    }

    public List<Message> getAllMessages() {
        return JPAMessageRepository.findAll();
    }

}
