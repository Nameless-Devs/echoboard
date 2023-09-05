package echoboard.echoboard.echo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Entity
@ToString
public class Echo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String title;
    private String content;
    private String author;
    private int upvotes;
    private int downvotes;
    private LocalDateTime created;

    public Echo(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.upvotes = 0;
        this.downvotes = 0;
    }

    protected Echo() {
    }

    @PrePersist
    private void onCreate() {
        this.created = LocalDateTime.now();
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setUpvotes(int upvotes) {
        this.upvotes = upvotes;
    }

    public void setDownvotes(int downvotes) {
        this.downvotes = downvotes;
    }

}

