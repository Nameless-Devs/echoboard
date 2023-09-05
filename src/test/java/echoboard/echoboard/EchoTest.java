package echoboard.echoboard;

import echoboard.echoboard.echo.Echo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EchoTest {

    private Echo echo;

    @BeforeEach
    void setUp() {
        echo = new Echo("Test title", "Test content", "Author Name");
    }

    @Test
    void testCreateEcho() {
        assertNotNull(echo);
        assertEquals("Test title", echo.getTitle());
        assertEquals("Test content", echo.getContent());
        assertEquals("Author Name", echo.getAuthor());
        assertEquals(0, echo.getUpvotes());
        assertEquals(0, echo.getDownvotes());
    }

    @Test
    void echoFieldsAreTheSame() {
        assertTrue(echo.toString().contains("Echo(id=null, title=Test title, content=Test content, author=Author Name, upvotes=0, downvotes=0, created=202"));
    }
}