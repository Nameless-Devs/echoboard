package echoboard.echoboard;

import org.springframework.data.repository.CrudRepository;

public interface JpaDiscussionRepository extends CrudRepository<Echo, Long> {
}
