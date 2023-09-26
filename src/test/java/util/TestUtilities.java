package util;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import se.salt.echoboard.model.EchoBoard;

public class TestUtilities {

    public static void assertEchoBoardEqual(EchoBoard expected, EchoBoard actual) {
        Assertions.assertNotNull(actual, "Actual EchoBoard should not be null");
        Assertions.assertEquals(expected.getId(), actual.getId());
        Assertions.assertEquals(expected.getTitle(), actual.getTitle());
        Assertions.assertEquals(expected.getContent(), actual.getContent());
        Assertions.assertEquals(expected.getAuthor(), actual.getAuthor());
    }

    public static EchoBoard echoBoardSample() {
        String title = "Ineffective Cross-Departmental Meetings";
        String content = "Cross-departmental meetings often lack direction and effectiveness. Participants from different departments may struggle to communicate their needs and expectations, resulting in lengthy, unproductive discussions. Improving meeting structures and agendas can enhance inter-departmental collaboration. ";
        String author = "Meeting Facilitator";
        return new EchoBoard(title, content, author);
    }
    public static String convertJsonString(final Object object) {
        try {
            return new ObjectMapper().writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
