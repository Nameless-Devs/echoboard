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
    @DisplayName("Should update the solution status and set a new chatRoom")
    public void testUpdateSolutionStatus() throws Exception {

        // Create a sample EchoBoardSolution with known solutionId and initial solutionStatus in the test database
        EchoBoardSolution solution = TestBuilders.createRandomEchoBoardSolution();

        solutionRepository.save(solution);

        // saving a new chatRoom if a status requires a volunteers.
        solution.setChatRoom(solution.getStatus().equals(EchoBoardSolution.SolutionStatus.VOLUNTEERS_REQUIRED) ?
                chatRoomRepository.save(new ChatRoom().setEchoBoardSolution(solution)) :
                null);

        // Send a PATCH request to update the solutionStatus
        String jsonRequest = TestUtilities.convertJsonString(solution);
         mockMvc.perform(patch("/api/v1/solutions/{solutionId}", solution.getId())
                        .param("updateToStage", EchoBoardSolution.SolutionStatus.IMPLEMENTATION_IN_PROGRESS.name())
                        .contentType("application/json")
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(EchoBoardSolution.SolutionStatus.IMPLEMENTATION_IN_PROGRESS.name()));

        // Verify that the chat room was created
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(solution.getChatRoom().getId());
        Assertions.assertTrue(chatRoom.isPresent());

    }

    @Test
    @WithMockOidcUser
    @DisplayName("Should get the EchoBoard solution ")
    public void testGetEchoBoardSolution() throws Exception {

        // Create a sample EchoBoardSolution with known solutionId and initial solutionStatus in the test database
        EchoBoardSolution solution = TestBuilders.createRandomEchoBoardSolution();

        solutionRepository.save(solution);

        // Send a GET request to get the EchoBoard solution
        String jsonRequest = TestUtilities.convertJsonString(solution);
        mockMvc.perform(get("/api/v1/solutions/{solutionId}", solution.getId())
                        .contentType("application/json")
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andReturn();

    }

    @Test
    @WithMockOidcUser
    @Transactional
    @DisplayName("Should add an upvote to the solution ")
    public void testUpvoteSolution() throws Exception {

        // Create a sample EchoBoardSolution with known solutionId and initial solutionStatus in the test database
        EchoBoardSolution solution = TestBuilders.createRandomEchoBoardSolution();

        solutionRepository.save(solution);


        String jsonRequest = TestUtilities.convertJsonString(solution);
        // Perform an upvote by sending a PATCH request to the endpoint
        mockMvc.perform(patch("/api/v1/solutions/{solutionId}/upvote", solution.getId())
                        .contentType("application/json")
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));

        // Verify that the upvote was recorded correctly in the database
        Optional<EchoBoardSolution> optionalSolution = solutionRepository.getSolutionById(solution.getId());
        Assertions.assertTrue(optionalSolution.isPresent());

        // Verify that the upvote was recorded correctly in the database
        EchoBoardSolution updatedSolution = optionalSolution.get();
        Assertions.assertEquals(1, updatedSolution.getUpvote().size());





    }

}

