package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@ToString
public class EchoBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
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
        this.upvote = 0;
        this.created = Instant.now();
    }

    public EchoBoard() {
        this.upvote = 0;

    public EchoBoard addUpvote() {
        this.upvote += 1;
        return this;
    }

        this.created = Instant.now();
    }

    public int addUpvote() {
        return this.upvote += 1;
    }

}
