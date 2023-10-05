package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;


@Entity
@Getter
@Setter
@ToString
@Table(name = "echo_board_comment")
@NoArgsConstructor
public class EchoBoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    private String author;

    @Column(length = 1000)
    private String content;
    private int upvote;
    private Instant created;

    public EchoBoardComment(String author, String content) {
        this.author = author;
        this.content = content;
    }

    public EchoBoardComment addUpvote() {
        this.upvote += 1;
        return this;
    }

    @PrePersist
    private void onCreate() {
        this.upvote = 0;
        this.created = Instant.now();
    }
}
