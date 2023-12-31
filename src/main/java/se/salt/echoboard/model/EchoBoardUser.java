package se.salt.echoboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table()
public class EchoBoardUser {

    @Id
    private String subject;
    private String name;
    private String email;
    private String picture;

    @OneToMany(mappedBy = "echoBoardUser", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"echoBoardUser", "echoBoardComments", "echoBoardSolutions"})
    private List<EchoBoard> echoBoards;

    @OneToMany(mappedBy = "echoBoardUser", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"echoBoardUser", "echoBoardComments"})
    private List<EchoBoardComment> echoBoardComments;

    @OneToMany(mappedBy = "echoBoardUser", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"echoBoardUser", "volunteers", "pendingVolunteers"})
    private List<EchoBoardSolution> echoBoardSolutions;

    @ManyToMany(mappedBy = "volunteers",
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonIgnoreProperties({"volunteers", "pendingVolunteers"})
    private List<EchoBoardSolution> volunteeredSolutions;

    @ManyToMany(mappedBy = "pendingVolunteers",
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonIgnoreProperties({"volunteers", "pendingVolunteers"})
    private List<EchoBoardSolution> pendingVolunteeredSolutions;
}
