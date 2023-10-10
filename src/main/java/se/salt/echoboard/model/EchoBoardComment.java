package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;


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
    @ElementCollection
    Set<String> upvote;
    private Instant created;
    private boolean anonymous;

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

    public EchoBoardComment addUpvote(String userSubject) {
        this.upvote.add(userSubject);
        return this;
    }

    public int getUpvote() {
        return upvote.size();
    }

    @PrePersist
    private void onCreate() {
        this.upvote = new HashSet<>();
        this.created = Instant.now();
    }
}
