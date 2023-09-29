package se.salt.echoboard.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.EchoBoardComment;

public interface JPAEchoBoardCommentRepository extends JpaRepository<EchoBoardComment, Long> {
}
