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
@Table(name = "echo_board_comment")
public class EchoBoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String author;
    private String comment;
    private Long upvote;

    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;

    public EchoBoardComment(String author, String comment) {
        this.author = author;
        this.comment = comment;
        this.upvote = 0L;
        this.created = Instant.now();
    }

    public EchoBoardComment() {
        this.upvote = 0L;
        this.created = Instant.now();
    }
}
