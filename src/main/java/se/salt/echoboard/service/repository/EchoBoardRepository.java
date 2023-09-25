package se.salt.echoboard.service.repository;

import lombok.AllArgsConstructor;
import se.salt.echoboard.model.EchoBoard;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class EchoBoardRepository {

    private final JPAEchoBoardRepository echoBoardRepository;

    public EchoBoard save(EchoBoard echoBoard) {
        return echoBoardRepository.save(echoBoard);
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
