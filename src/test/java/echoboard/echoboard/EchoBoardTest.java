package echoboard.echoboard;

import echoboard.echoboard.echo.EchoBoard;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EchoBoardTest {

    private EchoBoard echoBoard;

    @BeforeEach
    void setUp() {
        echoBoard = new EchoBoard("Test title", "Test content", "Author Name");
    }

    @Test
    void testCreateEcho() {
        assertNotNull(echoBoard);
        assertEquals("Test title", echoBoard.getTitle());
        assertEquals("Test content", echoBoard.getContent());
        assertEquals("Author Name", echoBoard.getAuthor());
        assertEquals(0, echoBoard.getUpvote());
    }

    @Test
    void echoFieldsAreTheSame() {
        assertTrue(echoBoard.toString().contains("EchoBoard(id=null, title=Test title, content=Test content, author=Author Name, upvotes=0, downvotes=0, created=202"));
    }
}