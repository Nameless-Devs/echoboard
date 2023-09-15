package echoboard.echoboard.echo;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import echoboard.echoboard.configuration.InstantConverter;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;
import java.util.ArrayList;

@Getter
@Setter
@ToString
@DynamoDBTable(tableName = "EchoBoardDevelopment")
public class EchoBoard {

    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    private String id;

    @DynamoDBAttribute
    private String title;

    @DynamoDBAttribute
    private String content;

    @DynamoDBAttribute
    private String author;

    @DynamoDBAttribute
    private Long upvote;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = InstantConverter.class)
    private Instant created;

    @DynamoDBAttribute
    private ArrayList<EchoBoardComment> echoBoardComments;

    @DynamoDBAttribute
    private ArrayList<EchoBoardSolution> echoBoardSolutions;

    public EchoBoard(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.upvote = 0L;
        this.created = Instant.now();
        this.echoBoardComments = new ArrayList<>();
        this.echoBoardSolutions = new ArrayList<>();
    }

    public EchoBoard() {
        this.upvote = 0L;
        this.created = Instant.now();
        this.echoBoardComments = new ArrayList<>();
        this.echoBoardSolutions = new ArrayList<>();
    }

    /**
     * Increases the upvote count for the current EchoBoard instance by one.
     *
     * @return The updated upvote count.
     */
    public Long addUpvote() {
        return this.upvote += 1;
    }
}

