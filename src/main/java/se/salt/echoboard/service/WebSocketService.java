package se.salt.echoboard.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardUserResponse;
import se.salt.echoboard.exception.custom.UserNotFoundException;
import se.salt.echoboard.model.ChatRoom;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.Message;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;
import se.salt.echoboard.service.repository.JPAChatRoomRepository;
import se.salt.echoboard.service.repository.JPAMessageRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WebSocketService {

    private final JPAChatRoomRepository chatRoomRepository;
    private final JPAMessageRepository messageRepository;
    private final EchoBoardUserRepository userRepository;
    private final DTOConvertor convertor;

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

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public List<EchoBoardUserResponse> getListOfVolunteers(long chatRoomId) {
        var chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(EntityNotFoundException::new);

        return chatRoom.getEchoBoardSolution()
                .getVolunteers().stream()
                .map(convertor::convertEntityToResponseDTO).toList();
    }

}
