package echoboard.echoboard;

import org.springframework.stereotype.Repository;

@Repository
public class EchoRepository {

    private final JpaEchoRepository repo;

    public EchoRepository(JpaEchoRepository repo){
        this.repo = repo;
    }

    public Iterable<Echo> getAllEchoes() {
        return repo.findAll();
    }

    public void save(Echo echo) {
        repo.save(echo);
    }
}
