package se.salt.echoboard.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.ChatRoom;

public interface JPAChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
