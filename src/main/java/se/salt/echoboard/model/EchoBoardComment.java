package se.salt.echoboard.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "echo_board_comment")
public class EchoBoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @Column(columnDefinition = "TEXT")
    private String content;
    //TODO Refactor to use
    // @CreatedDate and update field to createdAt
    private Instant created = Instant.now();
    private boolean anonymous;
    @ElementCollection
    private final Set<String> upvote = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL)
    private final List<EchoBoardComment> echoBoardComments = new LinkedList<>();
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "subject")
    private EchoBoardUser echoBoardUser;

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
