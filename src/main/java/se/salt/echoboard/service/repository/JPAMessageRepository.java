package se.salt.echoboard.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.Message;

import java.util.List;

public interface JPAMessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByChatRoomId(Long chatRoomId);
}
