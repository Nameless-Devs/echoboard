package se.salt.echoboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EchoBoardUser {

    @Id
    private String subject;
    private String name;
    private String email;
    private String picture;


    @OneToMany(mappedBy = "echoBoardUser")
    @JsonIgnoreProperties({"echoBoardUser", "echoBoardComments", "echoBoardSolutions"})
    private List<EchoBoard> echoBoards;
//
    @OneToMany(mappedBy = "echoBoardUser", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"echoBoardUser"})
    @JsonBackReference
    private List<EchoBoardComment> echoBoardComments;

    @OneToMany(mappedBy = "echoBoardUser")
    @JsonIgnoreProperties({"echoBoardUser", "upvote", "id", "content", "created", "anonymous"})
    private List<EchoBoardSolution> echoBoardSolutions;

}
