package echoboard.echoboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import echoboard.echoboard.echo.EchoBoard;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class EchoboardIntegrationTests {

    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    @Autowired
    public EchoboardIntegrationTests(MockMvc mockMvc, ObjectMapper objectMapper) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
    }

    @Test
    public void testPublishEchoBoard() throws Exception {
        EchoBoard expectedEcho = new EchoBoard("This is an integration test",
                "Please do not freak out", null);
        String jsonRequest = objectMapper.writeValueAsString(expectedEcho);

        MvcResult postResult = mockMvc.perform(post("/api/echoes")
                        .contentType("application/json")
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andReturn();

        String locationUrl = postResult.getResponse().getHeader("Location");
        assertNotNull(locationUrl, "Location URL should not be null!");

        MvcResult getResult = mockMvc.perform(get(locationUrl))
                .andExpect(status().isOk())
                .andReturn();

        EchoBoard actualEcho = objectMapper.readValue(getResult.getResponse().getContentAsString(), EchoBoard.class);

        expectedEcho.setId(actualEcho.getId());
        expectedEcho.setCreated(actualEcho.getCreated());

        assertEquals(expectedEcho.toString(), actualEcho.toString());
    }

}

