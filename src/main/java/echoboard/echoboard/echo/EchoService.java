package echoboard.echoboard.echo;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class EchoService {

    private final EchoRepository echoRepository;

    public EchoService(EchoRepository echoRepository) {
        this.echoRepository = echoRepository;
    }

//    public ArrayList<Echo> getAllEchoes() {
//        ArrayList<Echo> allEchoes = new ArrayList<>();
//        echoRepository.getAllEchoes().forEach(allEchoes::add);
//        return allEchoes;
//    }

    public Echo saveEcho(Echo echo) {
        return echoRepository.save(echo);
    }

    public Optional<Echo> getEchoById(long id) {
        return echoRepository.getEchoById(id);
    }
}
