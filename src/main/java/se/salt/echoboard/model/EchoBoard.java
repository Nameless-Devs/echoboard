package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


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
    @ElementCollection
    private final Set<String> upvote = new HashSet<>();
    @ManyToOne(fetch = FetchType.LAZY) // Use FetchType.LAZY for EchoBoardUser
    @JoinColumn(name = "subject")
    private EchoBoardUser echoBoardUser;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    @Column(length = 1000)
    private String content;
    private boolean anonymous;
    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;

    public EchoBoard addUpvote(String userSubject) {
        this.upvote.add(userSubject);
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
        this.created = Instant.now();
    }

    public EchoBoard setUser(EchoBoardUser user) {
        this.echoBoardUser = user;
        return this;
    }
}
