package se.salt.echoboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import se.salt.echoboard.model.EchoBoard;
import util.TestUtilities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class EchoBoardIntegrationTests {

    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    @Autowired
    public EchoBoardIntegrationTests(MockMvc mockMvc, ObjectMapper objectMapper) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
    }

    @Test
    public void testPublishEchoBoard() throws Exception {
        EchoBoard expectedEcho = TestUtilities.echoBoardSample();
        String jsonRequest = TestUtilities.convertJsonString(expectedEcho);

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

//        expectedEcho.setId(actualEcho.getId());
//        expectedEcho.setCreated(actualEcho.getCreated());

        assertEquals(expectedEcho.toString(), actualEcho.toString());
    }

    @Test
    public void testGetEchoById() throws Exception {
        EchoBoard expectedEcho = TestUtilities.echoBoardSample();
        String jsonRequest = TestUtilities.convertJsonString(expectedEcho);

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

//        expectedEcho.setId(actualEcho.getId());

        TestUtilities.assertEchoBoardEqual(expectedEcho, actualEcho);
    }

    @Test
    public void testGetStatus() throws Exception {

        mockMvc.perform(head("/api/status"))
                .andExpect(status().isOk())
                .andReturn();
    }
}

