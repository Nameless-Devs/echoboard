package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.*;

import java.net.URL;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EchoBoardUser {

    @Id
    private String subject;

    private String name;

    private String email;

    private URL image;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EchoBoard> usersPosts;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EchoBoardComment> usersComments;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
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
