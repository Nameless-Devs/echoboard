package echoboard.echoboard;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class DiscussionTest {

    private Discussion discussion;

    @BeforeEach
    void setUp() {
        discussion = new Discussion("Test title", "Test content", "Author Name");
    }

    @Test
    void testCreateDiscussion() {
        assertNotNull(discussion);
        assertEquals("Test title", discussion.getTitle());
        assertEquals("Test content", discussion.getContent());
        assertEquals("Author Name", discussion.getAuthor());
        assertEquals(0, discussion.getUpvotes());
        assertEquals(0, discussion.getDownvotes());
    }

    @Test
    void discussionFieldsAreTheSame() {
        assertEquals(discussion.toString(), "Discussion(id=null, title=Test title, content=Test content, author=Author Name, upvotes=0, downvotes=0, created=null)");
    }
}