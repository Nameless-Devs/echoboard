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

    public List<EchoBoard> findAll(int limit) {
        // Adjust this method according to your pagination needs
        return echoBoardRepository.findAll();
    }


    public Optional<EchoBoardComment> findCommentById(EchoBoard echoBoard, Long commentId) {
        return echoBoard.getEchoBoardComments().stream()
                .filter(comment -> comment.getId().equals(commentId))
                .findFirst();
    }

    public Long addCommentToEcho(Optional<EchoBoard> echoBoard, EchoBoardComment echoBoardComment) {
        return echoBoardRepository.saveCommentToPost(echoBoard, echoBoardComment);
    }

    public Long addSolutionToEcho(Optional<EchoBoard> echoBoard, EchoBoardSolution echoBoardSolution) {
        return echoBoardRepository.saveSolutionToPost(echoBoard,echoBoardSolution);
    }

//    public void deleteEcho(Long id) {
//        echoBoardRepository.deleteById(id);
//    }

}
