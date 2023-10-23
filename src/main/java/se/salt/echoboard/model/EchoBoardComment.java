package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Instant;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@ToString
@NoArgsConstructor
@Table(name = "echo_board_comment")
public class EchoBoardComment {

    @ElementCollection
    private final Set<String> upvote = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private final List<EchoBoardComment> echoBoardComments = new LinkedList<>();
    @ManyToOne
    @JoinColumn(name = "subject")
    private EchoBoardUser echoBoardUser;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @Column(columnDefinition = "TEXT")
    private String content;
    //TODO Refactor to use
    // @CreatedDate and update field to createdAt
    private Instant created = Instant.now();
    private boolean anonymous;

    public void addCommentToEchoBoardComment(EchoBoardComment echoBoardComment) {
        this.echoBoardComments.add(echoBoardComment);
    }

    public EchoBoardComment setEchoBoardUser(EchoBoardUser echoBoardUser) {
        this.echoBoardUser = echoBoardUser;
        return this;
    }

    public EchoBoardComment addUpvote(String userSubject) {
        this.upvote.add(userSubject);
        return this;
    }
}
