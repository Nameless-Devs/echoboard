package echoboard.echoboard.echo;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class EchoRepository {

    private final JpaEchoRepository repo;

    public EchoRepository(JpaEchoRepository repo){
        this.repo = repo;
    }

    public Iterable<Echo> getAllEchoes() {
        return repo.findAll();
    }

    public Echo save(Echo echo) {
        return repo.save(echo);
    }

    public Optional<Echo> getEchoById(long id) {
        return repo.findById(id);
    }
}
