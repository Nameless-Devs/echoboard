package util.data;

import se.salt.echoboard.controller.dto.EchoBoardCommentResponseDTO;
import se.salt.echoboard.controller.dto.EchoBoardUserResponseDTO;

import java.time.Instant;
import java.util.List;
import java.util.Set;

public class MockCommentData {

    // Post 1: Misaligned Goals Between Sales and Product Development
    public static List<EchoBoardCommentResponseDTO> COMMENTS_SALES = List.of(
            new EchoBoardCommentResponseDTO(
                    1L, "This is a common challenge, but it's important to have a process in place for aligning sales and product goals. One way to do this is to have regular meetings between the two teams to discuss customer feedback, market trends, and the product roadmap. This will help ensure that everyone is on the same page and that sales is focused on selling features that are aligned with the long-term product strategy.", Set.of("user1", "user2"), Instant.now(), false,
                    new EchoBoardUserResponseDTO("John Doe", "https://example.com/avatar.png")
            ),
            new EchoBoardCommentResponseDTO(
                    2L, "I've seen this disconnect lead to a lot of frustration on both sides. Sales is under pressure to meet their quotas, while product development is trying to build a product that meets the needs of all users. It's important to find a balance between these two goals, and that requires communication and collaboration from both teams.", Set.of("user3"), Instant.now(), false,
                    new EchoBoardUserResponseDTO("Jane Doe", "https://example.com/avatar.png")
            ),
            new EchoBoardCommentResponseDTO(
                    3L, "This is a great topic for discussion. I'd be interested to hear how other companies are addressing this challenge.", Set.of(),
                    Instant.now(), false,
                    new EchoBoardUserResponseDTO("Anonymous", "https://example.com/anonymous-avatar.png")
            )
    );

    // Post 2: Lack of Collaboration Between Marketing and Engineering
    public static List<EchoBoardCommentResponseDTO> COMMENTS_MARKET = List.of(
            new EchoBoardCommentResponseDTO(4L, "Collaboration between marketing and engineering is essential for successful product launches. Marketing needs to understand the technical capabilities of the product in order to set realistic expectations, and engineering needs to understand the marketing plan in order to prioritize features and meet deadlines. One way to improve collaboration is to have regular check-ins between the two teams, and to involve both teams in the product development process from the beginning.", Set.of("user4"), Instant.now(), false,
                    new EchoBoardUserResponseDTO("Peter Parker", "https://example.com/peter-parker-avatar.png")
            ),
            new EchoBoardCommentResponseDTO(5L, "I've seen this lack of collaboration lead to some costly mistakes. For example, one company I worked for launched a new product with a feature that was promised in the marketing materials, but the engineering team hadn't had time to implement it yet. This led to a lot of angry customers and a lot of damage to the company's reputation.", Set.of("user5"), Instant.now(),
                    false,
                    new EchoBoardUserResponseDTO("Mary Jane Watson", "https://example.com/mary-jane-watson-avatar.png")
            ),
            new EchoBoardCommentResponseDTO(
                    6L,
                    "What are some specific things that marketing and engineering teams can do to improve their collaboration?",
                    Set.of(),
                    Instant.now(),
                    false,
                    new EchoBoardUserResponseDTO("Anonymous", "https://example.com/anonymous-avatar.png")
            )
    );

    // Post 3: Data Sharing Challenges Between IT and Finance
    public static List<EchoBoardCommentResponseDTO> COMMENTS_IT = List.of(
            new EchoBoardCommentResponseDTO(7L, "Data sharing between IT and finance is critical for accurate financial reporting and decision-making. However, it can be challenging to balance the need for timely data with the need to protect sensitive data. One way to address this challenge is to implement a data governance framework that defines roles and responsibilities for data access and management.", Set.of("user6"), Instant.now(), false,
                    new EchoBoardUserResponseDTO("Bruce Wayne", "https://example.com/bruce-wayne-avatar.png")
            ),
            new EchoBoardCommentResponseDTO(
                    8L, "Another way to improve data sharing is to invest in data integration tools.", Set.of(), Instant.now(), false,
                    new EchoBoardUserResponseDTO("Billy", "https://example.com/anonymous-avatar.png")
            )
    );

}
