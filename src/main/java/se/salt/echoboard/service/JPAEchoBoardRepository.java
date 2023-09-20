package se.salt.echoboard.service;

import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.EchoBoard;

import java.util.Optional;

public interface JPAEchoBoardRepository extends JpaRepository<EchoBoard, Long> {
}
