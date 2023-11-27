package se.salt.echoboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import static se.salt.echoboard.model.EchoBoardSolution.SolutionStatus.SOLUTION_IN_REVIEW;


@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "echo_board_solution")
public class EchoBoardSolution {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(columnDefinition = "TEXT")
    private String content;
    private boolean anonymous;

    @Enumerated(EnumType.STRING)
    private SolutionStatus status = SOLUTION_IN_REVIEW;

    //TODO Refactor to use
    // @CreatedDate and update field to createdAt
    private Instant created = Instant.now();

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonIgnoreProperties({"echoBoards", "echoBoardComments", "echoBoardSolutions"})
    private Set<EchoBoardUser> volunteers = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonIgnoreProperties({"echoBoards", "echoBoardComments", "echoBoardSolutions"})
    private Set<EchoBoardUser> pendingVolunteers = new HashSet<>();

    @ElementCollection
    private final Set<String> upvote = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "subject")
    private EchoBoardUser echoBoardUser;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnoreProperties({"messages"})
    private ChatRoom chatRoom;

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

    public EchoBoardSolution addPendingVolunteer(EchoBoardUser volunteer) {
        this.pendingVolunteers.add(volunteer);
        return this;
    }

    public EchoBoardSolution removePendingVolunteer(EchoBoardUser volunteer) {
        this.pendingVolunteers.remove(volunteer);
        return this;
    }

    public EchoBoardSolution addVolunteer(EchoBoardUser volunteer) {
        this.volunteers.add(volunteer);
        return this;
    }

    public EchoBoardSolution setChatRoom(se.salt.echoboard.model.ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
        return this;
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
