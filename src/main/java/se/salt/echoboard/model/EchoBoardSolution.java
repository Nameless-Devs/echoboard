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
@Table(name = "echo_board_solution")
public class EchoBoardSolution {

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
    private boolean anonymous;
    @Enumerated(EnumType.STRING)
    private SolutionStatus status;
    @Column(columnDefinition = "TIMESTAMP")
    private Instant created;
    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<EchoBoardUser> volunteers = new ArrayList<>();

    public EchoBoardSolution addUpvote(String userSubject) {
        this.upvote.add(userSubject);
        return this;
    }

    public EchoBoardSolution updateSolutionStatus(SolutionStatus status) {
        this.status = status;
        return this;
    }

    public EchoBoardSolution setEchoBoardUser(EchoBoardUser echoBoardUser) {
        this.echoBoardUser = echoBoardUser;
        return this;
    }

    public EchoBoardSolution addVolunteer(EchoBoardUser volunteer) {
        this.volunteers.add(volunteer);
        return this;
    }

    @PrePersist
    private void onCreate() {
        this.upvote = new HashSet<>();
        this.created = Instant.now();
        this.status = SolutionStatus.SOLUTION_IN_REVIEW;
    }

    @Getter
    public enum SolutionStatus {
        SOLUTION_IN_REVIEW,
        VOLUNTEERS_REQUIRED,
        IMPLEMENTATION_IN_PROGRESS,
        SOLVED,
        FAILED
    }
}
