package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.Instant;


@Entity
//@Data
@ToString
@Table(name = "echo_board_solution")
@Getter
@Setter
public class EchoBoardSolution {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String author;
    private String content;
    private Long upvote;

    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;

    public EchoBoardSolution(String author, String content) {
        this.author = author;
        this.content = content;
        this.upvote = 0L;
        this.created = Instant.now();
    }

    public EchoBoardSolution() {
        this.upvote = 0L;
        this.created = Instant.now();
    }
}
