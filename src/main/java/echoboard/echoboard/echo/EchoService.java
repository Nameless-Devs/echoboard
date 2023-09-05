package echoboard.echoboard;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EchoService {

    private final EchoRepository echoRepository;

    public EchoService(EchoRepository echoRepository) {
        this.echoRepository = echoRepository;
    }

    public Iterable<Echo> getAllEchoes() {
        return echoRepository.getAllEchoes();
    }

    public void saveEcho(Echo echo) {
        echoRepository.save(echo);
    }

}
