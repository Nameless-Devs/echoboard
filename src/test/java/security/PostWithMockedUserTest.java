package security;

import com.fasterxml.jackson.databind.ObjectMapper;
import echoboard.echoboard.EchoboardApplication;
import echoboard.echoboard.echo.EchoBoard;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = EchoboardApplication.class)
@AutoConfigureMockMvc
public class MockedUserTest {

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @Autowired
    public MockedUserTest(MockMvc mockMvc, ObjectMapper objectMapper) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
    }

    @Test
    @WithMockUser
    public void testPublishEchoBoard() throws Exception {
        EchoBoard expectedEcho = new EchoBoard("Test Title", "Test Content", "Test Author");
        String jsonRequest = objectMapper.writeValueAsString(expectedEcho);

        MvcResult postResult = mockMvc.perform(post("/api/echoes")
                        .contentType("application/json")
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andReturn();

        String locationUrl = postResult.getResponse().getHeader("Location");
        assertNotNull(locationUrl, "Location URL should not be null!");

        String bearerToken = postResult.getResponse().getHeader("Authorization");

        MvcResult getResult = mockMvc.perform(get(locationUrl)
                        .header("Authorization", bearerToken))
                .andExpect(status().isOk())
                .andReturn();

        EchoBoard actualEcho = objectMapper.readValue(getResult.getResponse().getContentAsString(), EchoBoard.class);

        expectedEcho.setId(actualEcho.getId());
        expectedEcho.setCreated(actualEcho.getCreated());

        assertEquals(expectedEcho.toString(), actualEcho.toString());
    }
}
