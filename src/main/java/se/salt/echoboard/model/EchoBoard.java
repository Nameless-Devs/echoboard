package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@ToString
@NoArgsConstructor
public class EchoBoard {

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private final List<EchoBoardComment> echoBoardComments = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private final List<EchoBoardSolution> echoBoardSolutions = new ArrayList<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    @Column(length = 1000)
    private String content;
    private String author;
    private int upvote;
    private boolean anonymous;
    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;

    @ManyToOne
    @JoinColumn(name = "subject")
    EchoBoardUser echoBoardUser;

    public EchoBoard(String title, String content, String author, boolean anonymous) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.anonymous = anonymous;
    }

    public EchoBoard addUpvote() {
        this.upvote += 1;
        return this;
    }

    public void addComment(EchoBoardComment comment) {
        this.echoBoardComments.add(comment);
    }

    public void addSolution(EchoBoardSolution solution) {
        this.echoBoardSolutions.add(solution);
    }

    @PrePersist
    private void onCreate() {
        this.upvote = 0;
        this.created = Instant.now();
    }

    public void setUser(EchoBoardUser user) {
        this.echoBoardUser = user;
    }
}
