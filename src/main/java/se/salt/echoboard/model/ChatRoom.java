package se.salt.echoboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "chat_rooms")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Message> messages = new ArrayList<>();

    @OneToOne
    @JsonIgnoreProperties({"anonymous", "status", "volunteers", "pendingVolunteers", "upvote", "chatRoom"})
    private EchoBoardSolution echoBoardSolution;

    private String title;

    public ChatRoom setEchoBoardSolution(EchoBoardSolution echoBoardSolution) {
        this.echoBoardSolution = echoBoardSolution;
        return this;
    }

    public ChatRoom setTitle(String title) {
        this.title = title;
        return this;
    }
}
