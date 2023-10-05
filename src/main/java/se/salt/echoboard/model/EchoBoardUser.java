package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class EchoBoardUser {

    @Id
    private String subject;
    private String name;
    private String email;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<EchoBoard> usersPosts;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<EchoBoardComment> usersComments;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<EchoBoardSolution> usersSolutions;

    public EchoBoardUser addUserPost(EchoBoard echoBoard) {
        usersPosts.add(echoBoard);
        return this;
    }

    public EchoBoardUser addUserComment(EchoBoardComment echoBoardComment) {
        usersComments.add(echoBoardComment);
        return this;
    }

    public EchoBoardUser addUserSolution(EchoBoardSolution solution) {
        usersSolutions.add(solution);
        return this;
    }
}
