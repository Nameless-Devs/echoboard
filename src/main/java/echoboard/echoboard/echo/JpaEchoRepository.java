package echoboard.echoboard.echo;

import echoboard.echoboard.echo.Echo;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface JpaEchoRepository extends CrudRepository<Echo, Long> {
}
