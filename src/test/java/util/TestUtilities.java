package util;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import se.salt.echoboard.model.EchoBoard;

public class TestUtilities {


    public static EchoBoard echoBoardSample() {
        String title = "Sample title";
        String content = "Sample content";
        String author = "Sample author";
        return new EchoBoard(title, content, author);
    }

    public static void assertEchoBoardEqual(EchoBoard expected, EchoBoard actual) {
        Assertions.assertNotNull(actual, "Actual EchoBoard should not be null");
        Assertions.assertEquals(expected.getId(), actual.getId());
        Assertions.assertEquals(expected.getTitle(), actual.getTitle());
        Assertions.assertEquals(expected.getContent(), actual.getContent());
        Assertions.assertEquals(expected.getAuthor(), actual.getAuthor());
    }

    public static String convertJsonString(final Object object) {
        try {
            return new ObjectMapper().writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
