package echoboard.echoboard.echo;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import lombok.Getter;
import lombok.ToString;
import java.time.LocalDateTime;

@Getter
@ToString
@DynamoDBTable(tableName = "EchoBoardDevelopment")
public class Echo {

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
    private int upvotes;
    @DynamoDBAttribute
    private int downvotes;
    @DynamoDBAttribute
    private String created;

    public Echo(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.upvotes = 0;
        this.downvotes = 0;
        this.created = LocalDateTime.now().toString();
    }

    public Echo() {
        created = LocalDateTime.now().toString();
    }

    public void setId(String id) {
        this.id = id;
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

    public void setCreated(String created) {
        this.created = created;
    }

}

