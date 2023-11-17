package se.salt.echoboard.controller;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.test.web.servlet.MockMvc;
import se.salt.echoboard.model.ChatRoom;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.repository.EchoBoardRepository;
import se.salt.echoboard.service.repository.EchoBoardSolutionRepository;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;
import se.salt.echoboard.service.repository.JPAChatRoomRepository;
import util.TestBuilders;
import util.TestUtilities;
import util.mock.WithMockOidcUser;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SolutionControllerTest {

    private final MockMvc mockMvc;
    @Autowired
    private EchoBoardSolutionRepository solutionRepository;
    @Autowired
    private JPAChatRoomRepository chatRoomRepository;
    @Autowired
    private EchoBoardUserRepository userRepository;
    @Autowired
    private EchoBoardRepository echoBoardRepository;

    @Autowired
    public SolutionControllerTest(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    @WithMockOidcUser
    @DisplayName("Should update the solution status and set a new chatRoom")
    public void testUpdateSolutionStatus() throws Exception {

        // Create a sample EchoBoardSolution with known solutionId and initial solutionStatus in the test database
        EchoBoardSolution solution = TestBuilders.createRandomEchoBoardSolution();
        //Create and set user for solution
        var oidcUser = (OidcUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var user = EchoBoardUser.builder().subject(oidcUser.getSubject()).build();
        var echoBoard = new EchoBoard().setUser(user);
        userRepository.createUser(oidcUser);
        echoBoardRepository.save(echoBoard);
        echoBoard.addSolution(solution.setEchoBoardUser(user));
        echoBoardRepository.save(echoBoard);


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

    @Test
    @WithMockOidcUser
    @DisplayName("Should add an upvote to the solution ")
    public void testVolunteerForSolution() throws Exception {

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
        Assertions.assertNotNull(updatedSolution.getVolunteers());
    }
}
