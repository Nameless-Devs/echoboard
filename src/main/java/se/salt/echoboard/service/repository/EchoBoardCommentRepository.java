package se.salt.echoboard.service.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import se.salt.echoboard.model.EchoBoardComment;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class EchoBoardCommentRepository {

    private final JPAEchoBoardCommentRepository commentRepository;

    public Optional<EchoBoardComment> findCommentById(long commentId) {
        return commentRepository.findById(commentId);
    }

    public EchoBoardComment saveComment( EchoBoardComment comment) {
        return commentRepository.save(comment);
    }

}
