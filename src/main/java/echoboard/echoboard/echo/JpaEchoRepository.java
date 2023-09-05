package echoboard.echoboard;

import org.springframework.data.repository.CrudRepository;

public interface JpaEchoRepository extends CrudRepository<Echo, Long> {
}
