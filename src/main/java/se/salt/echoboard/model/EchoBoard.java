package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class EchoBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @Column(length = 1000)
    private String content;
    private String author;
    private int upvote;

    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "echo_board_id")
    @ToString.Exclude
    private List<EchoBoardComment> echoBoardComment = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "echo_board_id")
    @ToString.Exclude
    private List<EchoBoardSolution> echoBoardSolutions = new ArrayList<>();

    public EchoBoard(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public EchoBoard addUpvote() {
        this.upvote += 1;
        return this;
    }

    public EchoBoard addSolution(EchoBoardSolution solution) {
        this.echoBoardSolutions.add(solution);
        return this;
    }

    @PrePersist
    private void onCreate() {
        this.upvote = 0;
        this.created = Instant.now();
    }

}
