package se.salt.echoboard.service;

import se.salt.echoboard.model.EchoBoard;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EchoBoardRepository {

    private final JPAEchoBoardRepository echoBoardRepository;

    public EchoBoardRepository(JPAEchoBoardRepository echoBoardRepository){
        this.echoBoardRepository = echoBoardRepository;
    }

    public EchoBoard save(EchoBoard echoBoard) {
        echoBoardRepository.save(echoBoard);
        return echoBoard;
    }

    public Optional<EchoBoard> getEchoById(long id) {
        return echoBoardRepository.findById(id);
    }

    public List<EchoBoard> findAll() {
        return echoBoardRepository.findAll();
    }

    public void deleteEcho(EchoBoard echo) {
        echoBoardRepository.delete(echo);
    }
}
