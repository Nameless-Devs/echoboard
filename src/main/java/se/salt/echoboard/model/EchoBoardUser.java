package se.salt.echoboard.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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


    @OneToMany(mappedBy = "echoBoardUser", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"echoBoardUser", "echoBoardComments", "echoBoardSolutions"})
    private List<EchoBoard> echoBoards;

    @OneToMany(mappedBy = "echoBoardUser", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"echoBoardUser"})
    @JsonBackReference
    private List<EchoBoardComment> echoBoardComments;

    @OneToMany(mappedBy = "echoBoardUser", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"echoBoardUser"})
    private List<EchoBoardSolution> echoBoardSolutions;

}
