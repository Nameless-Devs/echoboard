package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@ToString
@NoArgsConstructor
@Table(name = "echo_board_comment")
public class EchoBoardComment {

    @ElementCollection
    Set<String> upvote;
    @ManyToOne
    @JoinColumn(name = "subject")
    EchoBoardUser echoBoardUser;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @Column(length = 1000)
    private String content;
    private Instant created;
    private boolean anonymous;
    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<EchoBoardComment> echoBoardComments = new LinkedList<>();

    public EchoBoardComment addCommentToEchoBoardComment(EchoBoardComment echoBoardComment) {
        this.echoBoardComments.add(echoBoardComment);
        return echoBoardComment;
    }

    public EchoBoardComment setEchoBoardUser(EchoBoardUser echoBoardUser) {
        this.echoBoardUser = echoBoardUser;
        return this;
    }

    public EchoBoardComment addUpvote(String userSubject) {
        this.upvote.add(userSubject);
        return this;
    }

    @PrePersist
    private void onCreate() {
        this.upvote = new HashSet<>();
        this.created = Instant.now();
    }
}
