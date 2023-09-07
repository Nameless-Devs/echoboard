//package echoboard.echoboard;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import echoboard.echoboard.echo.Echo;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class EchoboardIntegrationTests {
//
//    private final MockMvc mockMvc;
//    private final ObjectMapper objectMapper;
//
//    @Autowired
//    public EchoboardIntegrationTests(MockMvc mockMvc, ObjectMapper objectMapper) {
//        this.mockMvc = mockMvc;
//        this.objectMapper = objectMapper;
//    }
//
//    @Test
//    public void testSaveEcho() throws Exception {
//        Echo echo = new Echo("Test Title", "Test Content", "Test Author");
//
//        String jsonRequest = objectMapper.writeValueAsString(echo);
//
//        MvcResult postResult = mockMvc.perform(post("/api/echoes")
//                        .contentType("application/json")
//                        .content(jsonRequest))
//                .andExpect(status().isCreated())
//                .andReturn();
//
//        String locationUrl = postResult.getResponse().getHeader("Location");
//        assertNotNull(locationUrl, "Location URL should not be null!");
//
//        mockMvc.perform(get(locationUrl))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("title").value("Test Title"))
//                .andExpect(jsonPath("content").value("Test Content"))
//                .andExpect(jsonPath("author").value("Test Author"))
//                .andExpect(jsonPath("upvotes").value(0))
//                .andExpect(jsonPath("downvotes").value(0))
//                .andExpect(jsonPath("id").value(locationUrl.split("/")[5]))
//                .andExpect(jsonPath("created").isNotEmpty())
//        ;
//
//    }
//}

