package se.salt.echoboard.service.repository;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import se.salt.echoboard.model.EchoBoard;

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

    public List<EchoBoard> findByOrderByCreatedDesc(Pageable page) {
        return echoBoardRepository.findByOrderByCreatedDesc(page);
    }

    public void deleteById(long echoId) {
        echoBoardRepository.deleteById(echoId);
    }


}
