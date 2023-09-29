package se.salt.echoboard.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;

public interface JPAEchoBoardRepository extends JpaRepository<EchoBoard, Long> {
}
