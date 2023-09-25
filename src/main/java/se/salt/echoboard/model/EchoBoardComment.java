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
    private String content;
    private int upvote;

    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;

    public EchoBoardComment() {
        this.upvote = 0;
        this.created = Instant.now();
    }

    public EchoBoardComment(String author, String content) {
        this.author = author;
        this.content = content;
        this.upvote = 0;
        this.created = Instant.now();
    }

    public int addUpvote() {
        return this.upvote += 1;
    }
}
