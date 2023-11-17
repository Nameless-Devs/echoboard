package se.salt.echoboard;

import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import se.salt.echoboard.controller.dto.EchoBoardResponse;
import se.salt.echoboard.model.ChatRoom;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.service.repository.EchoBoardSolutionRepository;
import se.salt.echoboard.service.repository.JPAChatRoomRepository;
import util.TestBuilders;
import util.dto.request.EchoBoardRequestDto;
import util.TestUtilities;
import util.mock.WithMockOidcUser;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static util.TestUtilities.*;

@SpringBootTest
@AutoConfigureMockMvc
public class EchoBoardIntegrationTests {

    private final MockMvc mockMvc;
    @Autowired
    private EchoBoardSolutionRepository solutionRepository;
    @Autowired
    private JPAChatRoomRepository chatRoomRepository;

    @Autowired
    public EchoBoardIntegrationTests(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    @WithMockOidcUser
    public void testPublishEchoBoard() throws Exception {
        var requestEcho = TestUtilities.echoBoardSample();
        String jsonRequest = TestUtilities.convertJsonString(requestEcho);

        MvcResult postResult = mockMvc.perform(post("/api/v1/echoes")
                        .contentType("application/json")
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andReturn();

        EchoBoardResponse actualEcho = getObjectFromResponse(postResult, EchoBoardResponse.class);
        assertEchoBoardEqual(requestEcho, actualEcho);
    }

    @Test
    @WithMockOidcUser
    public void testGetAllEchoes() throws Exception {
        List<EchoBoardRequestDto> expectedEcho = echoBoardListSample();

        for (EchoBoardRequestDto echoBoard : expectedEcho) {
            String jsonRequest = TestUtilities.convertJsonString(echoBoard);
            mockMvc.perform(post("/api/v1/echoes")
                            .contentType("application/json")
                            .content(jsonRequest))
                    .andExpect(status().isCreated())
                    .andReturn();
        }


        MvcResult getResult = mockMvc.perform(get("/api/v1/echoes"))
                .andExpect(status().isOk())
                .andReturn();

        List<EchoBoardResponse> echoBoards = OBJECT_MAPPER.readValue(getResult.getResponse()
                .getContentAsString(), new TypeReference<>() {});
        Collections.reverse(echoBoards);
        for (int i = 0; i < echoBoards.size(); i++) {
            assertEchoBoardEqual(expectedEcho.get(i), echoBoards.get(i));
        }
    }

    @Test
    @WithMockOidcUser
    public void testGetStatus() throws Exception {

        mockMvc.perform(head("/api/v1/status"))
                .andExpect(status().isOk())
                .andReturn();
    }


    @Test
    @WithMockOidcUser
    @DisplayName("Should add pending volunteer to the solution ")
    public void testPendingVolunteerForSolution() throws Exception {

        // Create a sample EchoBoardSolution with known solutionId and initial solutionStatus in the test database
        EchoBoardSolution solution = TestBuilders.createRandomEchoBoardSolution();
        solutionRepository.save(solution);

        String jsonRequest = TestUtilities.convertJsonString(solution);
        // Perform a volunteer action by sending a POST request to the endpoint
        mockMvc.perform(post("/api/v1/solutions/{solutionId}/volunteer", solution.getId())
                        .contentType("application/json")
                        .content(jsonRequest))
                .andExpect(status().isCreated());

        // Verify that the user has been added as a volunteer to the solution
        Optional<EchoBoardSolution> optionalSolution = solutionRepository.getSolutionById(solution.getId());
        Assertions.assertTrue(optionalSolution.isPresent());

        EchoBoardSolution updatedSolution = optionalSolution.get();
        Assertions.assertNotNull(updatedSolution.getPendingVolunteers());
    }

}

