package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@ToString
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class EchoBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    private boolean anonymous;

    //TODO Refactor to use
    // @CreatedDate and update field to createdAt
    private Instant created = Instant.now();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @ToString.Exclude
    private final List<EchoBoardComment> echoBoardComments = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @ToString.Exclude
    private final List<EchoBoardSolution> echoBoardSolutions = new ArrayList<>();
    @ElementCollection
    private final Set<String> upvote = new HashSet<>();
    @ManyToOne(fetch = FetchType.LAZY) // Use FetchType.LAZY for EchoBoardUser
    @JoinColumn(name = "subject")
    private EchoBoardUser echoBoardUser;

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

    public EchoBoard setUser(EchoBoardUser user) {
        this.echoBoardUser = user;
        return this;
    }

}
