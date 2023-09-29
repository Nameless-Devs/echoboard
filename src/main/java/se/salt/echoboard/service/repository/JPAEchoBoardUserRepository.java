package se.salt.echoboard.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.salt.echoboard.model.EchoBoardUser;

import java.util.Optional;

public interface JPAEchoBoardUserRepository extends JpaRepository<EchoBoardUser, Long> {

    Optional<EchoBoardUser> findBySubject(String userSubject);
}
