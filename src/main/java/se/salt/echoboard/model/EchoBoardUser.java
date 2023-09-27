package se.salt.echoboard.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EchoBoardUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String email;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EchoBoard> usersPosts;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EchoBoardComment> usersComments;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EchoBoardSolution> usersSolutions;

    private String jwtId;
}
