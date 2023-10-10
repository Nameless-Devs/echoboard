package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Instant;


@Entity
@Getter
@ToString
@NoArgsConstructor
@Table(name = "echo_board_comment")
public class EchoBoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(length = 1000)
    private String content;
    private int upvote;
    private Instant created;

    public EchoBoardComment setEchoBoardUser(EchoBoardUser echoBoardUser) {
        this.echoBoardUser = echoBoardUser;
        return this;
    }

    @ManyToOne
    @JoinColumn(name = "subject")
    EchoBoardUser echoBoardUser;

    public EchoBoardComment(String content) {
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
