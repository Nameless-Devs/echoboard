package echoboard.echoboard.echo;

import jakarta.transaction.Transactional;
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

    public Comment saveComment(Comment comment) {
        return echoRepository.saveComment(comment);
    }

    public Optional<EchoBoard> getEchoById(String id) {
        return echoRepository.getEchoById(id);
    }
}
