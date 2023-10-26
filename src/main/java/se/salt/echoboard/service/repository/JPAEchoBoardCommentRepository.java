package se.salt.echoboard.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardUser;

import java.util.List;

public interface JPAEchoBoardCommentRepository extends JpaRepository<EchoBoardComment, Long> {

    List<EchoBoardComment> findByEchoBoardUser(EchoBoardUser user);
}
