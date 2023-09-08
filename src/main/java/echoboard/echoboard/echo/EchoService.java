package echoboard.echoboard.echo;

import jakarta.transaction.Transactional;
import org.apache.http.HttpException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class EchoService {

    private final EchoRepository echoRepository;

    public EchoService(EchoRepository echoRepository) {
        this.echoRepository = echoRepository;
    }

    public EchoBoard saveEcho(EchoBoard echoBoard) {
        return echoRepository.save(echoBoard);
    }

    public String addCommentToEcho(EchoBoard echoBoard, Comment comment) {

        echoBoard.getComments().add(comment);
        saveEcho(echoBoard);
        return comment.getId();
    }

    public Optional<EchoBoard> getEchoById(String id) {
        return echoRepository.getEchoById(id);
    }
}
