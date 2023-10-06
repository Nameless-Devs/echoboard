package se.salt.echoboard;

import com.fasterxml.jackson.core.type.TypeReference;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import se.salt.echoboard.model.EchoBoard;
import util.TestUtilities;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static util.TestUtilities.*;

@SpringBootTest
@AutoConfigureMockMvc
public class EchoBoardIntegrationTests {

    private final MockMvc mockMvc;

    @Autowired
    public EchoBoardIntegrationTests(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
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

        EchoBoard actualEcho = getObjectFromResponse(getResult, EchoBoard.class);
        assertEchoBoardEqual(expectedEcho, actualEcho);
    }

    @Test
    public void testGetAllEchoes() throws Exception {
        List<EchoBoard> expectedEcho = echoBoardListSample();

        for (EchoBoard echoBoard : expectedEcho) {
            String jsonRequest = TestUtilities.convertJsonString(echoBoard);
            mockMvc.perform(post("/api/echoes")
                            .contentType("application/json")
                            .content(jsonRequest))
                    .andExpect(status().isCreated())
                    .andReturn();
        }


        MvcResult getResult = mockMvc.perform(get("/api/echoes"))
                .andExpect(status().isOk())
                .andReturn();

        List<EchoBoard> echoBoards = OBJECT_MAPPER.readValue(getResult.getResponse()
                .getContentAsString(), new TypeReference<>() {
        });
        Collections.reverse(echoBoards);
        for (int i = 0; i < echoBoards.size(); i++) {
            assertEchoBoardEqual(expectedEcho.get(i), echoBoards.get(i));
        }
    }

    @Test
    public void testGetStatus() throws Exception {

        mockMvc.perform(head("/api/status"))
                .andExpect(status().isOk())
                .andReturn();
    }
}

