package se.salt.echoboard.service.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import se.salt.echoboard.controller.dto.EchoBoardPreview;
import se.salt.echoboard.controller.dto.EchoBoardResponse;
import se.salt.echoboard.model.EchoBoard;

import java.util.List;
import java.util.Optional;

public interface JPAEchoBoardRepository extends JpaRepository<EchoBoard, Long> {
    @Query("select e from EchoBoard e order by e.created DESC")
    List<EchoBoard> findByOrderByCreatedDesc(Pageable pageable);

    Optional<EchoBoard> findByEchoBoardSolutions_Id(long id);

    Optional<EchoBoard> findByEchoBoardComments_Id(long id);

}

