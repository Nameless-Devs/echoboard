package echoboard.echoboard;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DiscussionTest {

    private Echo echo;

    @BeforeEach
    void setUp() {
        echo = new Echo("Test title", "Test content", "Author Name");
    }

    @Test
    void testCreateDiscussion() {
        assertNotNull(echo);
        assertEquals("Test title", echo.getTitle());
        assertEquals("Test content", echo.getContent());
        assertEquals("Author Name", echo.getAuthor());
        assertEquals(0, echo.getUpvotes());
        assertEquals(0, echo.getDownvotes());
    }

    @Test
    void discussionFieldsAreTheSame() {
        assertEquals(echo.toString(), "Discussion(id=null, title=Test title, content=Test content, author=Author Name, upvotes=0, downvotes=0, created=null)");
    }
}