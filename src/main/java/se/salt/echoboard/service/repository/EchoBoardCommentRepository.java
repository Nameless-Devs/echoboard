package se.salt.echoboard.service.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardUser;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class EchoBoardCommentRepository {

    private final JPAEchoBoardCommentRepository commentRepository;

    public Optional<EchoBoardComment> getCommentById(long commentId) {
        return commentRepository.findById(commentId);
    }

    public EchoBoardComment save(EchoBoardComment comment) {
        return commentRepository.save(comment);
    }

    public List<EchoBoardComment> findByEchoBoardUser(EchoBoardUser user) {
        return commentRepository.findByEchoBoardUser(user);
    }

}
