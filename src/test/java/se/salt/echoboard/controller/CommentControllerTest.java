package se.salt.echoboard.controller;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;

import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.service.EchoBoardService;
import util.mock.AuthenticationPrincipalResolver;
import util.mock.WithMockOidcUser;

import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static util.TestUtilities.OBJECT_MAPPER;


@ExtendWith(SpringExtension.class)
public class CommentControllerTest {

    private MockMvc mvc;
    @Mock
    private EchoBoardService echoService;
    @InjectMocks
    private CommentController controller;

    @BeforeEach
    public void setup() {

        JacksonTester.initFields(this, OBJECT_MAPPER);
        mvc = MockMvcBuilders.standaloneSetup(this.controller)
                .setCustomArgumentResolvers(new AuthenticationPrincipalResolver())
//                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

    }

    @AfterEach
    void tearDown() {
    }

    @Test
    public void testGetCommentById_notFound() throws Exception {
        given(echoService.getCommentById(1L))
                .willReturn(Optional.empty());

        mvc.perform(get("/api/comments/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    void getCommentById() throws Exception {
        given(echoService.getCommentById(1L))
                .willReturn(Optional.of(new EchoBoardComment()));

        mvc.perform(get("/api/comments/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }


    @Test
    @WithMockOidcUser
    void upvoteComment_notFound() throws Exception {

        mvc.perform(patch("/api/comments/1/upvote"))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    void addCommentToEchoBoardComment() {
    }

}
