package util;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Assertions;
import org.springframework.test.web.servlet.MvcResult;
import se.salt.echoboard.model.EchoBoard;

import java.io.UnsupportedEncodingException;
import java.util.List;

public class TestUtilities {

    public static final ObjectMapper OBJECT_MAPPER;

    static {
        OBJECT_MAPPER = new ObjectMapper();
        OBJECT_MAPPER.registerModule(new JavaTimeModule());
    }

    public static void assertEchoBoardEqual(EchoBoard expected, EchoBoard actual) {
        Assertions.assertNotNull(actual, "Actual EchoBoard should not be null");
        Assertions.assertEquals(expected.getTitle(), actual.getTitle());
        Assertions.assertEquals(expected.getContent(), actual.getContent());
        if (expected.isAnonymous()) {
            Assertions.assertEquals("Anonymous", actual.getAuthor());
        } else {
            Assertions.assertEquals(expected.getAuthor(), actual.getAuthor());
        }
    }

    public static EchoBoard echoBoardSample() {
        String title = "Ineffective Cross-Departmental Meetings";
        String content = "Cross-departmental meetings often lack direction and effectiveness. Participants from different departments may struggle to communicate their needs and expectations, resulting in lengthy, unproductive discussions. Improving meeting structures and agendas can enhance inter-departmental collaboration. ";
        String author = "Meeting Facilitator";
        return new EchoBoard(title, content, author, true);
    }

    public static List<EchoBoard> echoBoardListSample() {
        return List.of(
                new EchoBoard("Misaligned Goals Between Sales and Product Development",
                        "The misalignment of goals between our sales and product development departments is a persistent challenge. Sales often pushes for new features or changes that may not align with the long-term product strategy. This disconnect can result in frequent scope changes, delays, and customer dissatisfaction.",
                        "Product Manager", true),

                new EchoBoard("Lack of Collaboration Between Marketing and Engineering",
                        "The lack of collaboration between our marketing and engineering teams has been hindering product launches. Marketing might promise features or release dates without consulting engineering, leading to unrealistic expectations and strained relationships. Improved communication and collaboration are essential to avoid such conflicts.",
                        "Marketing Manager", false),

                new EchoBoard("Data Sharing Challenges Between IT and Finance",
                        "Data sharing between our IT and finance departments has become a significant hurdle. Finance relies on timely and accurate data from IT systems for financial reporting, but IT often struggles to prioritize and deliver these requests promptly. This disconnect affects financial planning and decision-making.",
                        "Finance Director", true),

                new EchoBoard("Conflicting Priorities Between HR and Operations",
                        "HR and operations often have conflicting priorities. HR aims to enhance employee well-being, while operations focus on productivity and cost-efficiency. Balancing these competing goals can be challenging, and it requires a coordinated effort to find common ground and achieve organizational success.",
                        "HR Director", false),

                new EchoBoard("Communication Gaps Between Customer Support and R&D",
                        "Communication Gaps Between Customer Support and R&D', 'Communication gaps between our customer support and research and development (R&D) teams have led to customer dissatisfaction. Customer support may not adequately convey customer feedback and issues to R&D, resulting in product improvements being delayed or overlooked. Bridging these gaps is crucial for product enhancement.",
                        "Customer Support Manager", false)
        );

    }

    public static String convertJsonString(final Object object) {
        try {
            return OBJECT_MAPPER.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static <T> T getObjectFromResponse(MvcResult getResult, Class<T> inputClass) {
        try {
            String content = getResult.getResponse().getContentAsString();
            return OBJECT_MAPPER.readValue(content, inputClass);
        } catch (UnsupportedEncodingException | JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}
