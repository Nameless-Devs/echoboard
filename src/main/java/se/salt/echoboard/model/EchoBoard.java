package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
public class EchoBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    private String title;
    private String content;
    private String author;
    private int upvote;

    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true) //removed cascade = CascadeType.ALL,
    @JoinColumn(name = "echo_board_id")
    private List<EchoBoardComment> echoBoardComments = new ArrayList<>();
//
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "echo_board_id")
//    private List<EchoBoardSolution> echoBoardSolutions = new ArrayList<>();

    public EchoBoard(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.upvote = 0;
        this.created = Instant.now();
    }

    public EchoBoard() {
        this.upvote = 0;
        this.created = Instant.now();
    }

    public int addUpvote() {
        return this.upvote += 1;
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "title = " + title + ", " +
                "content = " + content + ", " +
                "author = " + author + ", " +
                "upvote = " + upvote + ", " +
                "created = " + created + ")";
    }
}
