package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.Instant;


@Entity
@Getter
@Setter
@ToString
@Table(name = "echo_board_solution")
public class EchoBoardSolution {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String author;

    @Column(length = 1000)
    private String content;
    private int upvote;

    @Enumerated(EnumType.STRING)
    private SolutionStatus status;

    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;

    public EchoBoardSolution(String author, String content) {
        this.author = author;
        this.content = content;
        this.upvote = 0;
        this.created = Instant.now();
        this.status = SolutionStatus.SOLUTION_IN_REVIEW;
    }

    public EchoBoardSolution() {
        this.upvote = 0;
        this.created = Instant.now();
    }

    @Getter
    public enum SolutionStatus {
        SOLUTION_IN_REVIEW,
        VOLUNTEERS_REQUIRED,
        IMPLEMENTATION_IN_PROGRESS,
        SOLVED,
        FAILED;
    }

    public EchoBoardSolution addUpvote() {
        this.upvote += 1;
        return this;
    }

}
