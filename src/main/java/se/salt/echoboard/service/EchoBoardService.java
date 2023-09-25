package se.salt.echoboard.service;


import lombok.AllArgsConstructor;
import se.salt.echoboard.model.EchoBoard;
import org.springframework.stereotype.Service;
import java.util.List;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.repository.EchoBoardCommentRepository;
import se.salt.echoboard.service.repository.EchoBoardRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class EchoBoardService {

    private final EchoBoardRepository echoBoardRepository;

    private final EchoBoardCommentRepository commentRepository;

    public EchoBoard saveEcho(EchoBoard echoBoard) {
        return echoBoardRepository.save(echoBoard);
    }

    public EchoBoardComment saveComment(EchoBoardComment comment) {
        return commentRepository.saveComment(comment);
    }

    public Optional<EchoBoard> getEchoById(Long id) {
        return echoBoardRepository.getEchoById(id);
    }

    public List<EchoBoard> findAll() {
        return echoBoardRepository.findAll();
    }

    public Optional<EchoBoardComment> findCommentById(long commentId) {
        return commentRepository.findCommentById(commentId);
    }

    public Optional<Long> addCommentToEcho(Optional<EchoBoard> echoBoard, EchoBoardComment echoBoardComment) {
        return echoBoardRepository.addCommentToPost(echoBoard, echoBoardComment);
    }

    public Optional<Long> addSolutionToEcho(Optional<EchoBoard> echoBoard, EchoBoardSolution echoBoardSolution) {
        return echoBoardRepository.addSolutionToPost(echoBoard,echoBoardSolution);
    }

    public Optional<Integer> upvoteComment (long commentId) {
        var comment = findCommentById(commentId);
        comment.map(EchoBoardComment::addUpvote);
        comment.map(this::saveComment);
        return comment.map(EchoBoardComment::getUpvote);
    }

//    public void deleteEcho(Long id) {
//        echoBoardRepository.deleteById(id);
//    }

}
