package se.salt.echoboard.controller;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;

import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import se.salt.echoboard.exception.GeneralExceptionHandler;
import se.salt.echoboard.service.EchoBoardService;
import util.mock.AuthenticationPrincipalResolver;
import util.mock.WithMockOidcUser;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static util.TestUtilities.OBJECT_MAPPER;
import static util.data.MockCommentData.*;


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
                .setControllerAdvice(new GeneralExceptionHandler())
                .setCustomArgumentResolvers(new AuthenticationPrincipalResolver())
                .build();
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    public void testGetCommentById_notFound() throws Exception {
        given(echoService.getCommentById(1L));

        mvc.perform(get("/api/v1/comments/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    void getCommentById() throws Exception {
        given(echoService.getCommentById(2L))
                .willReturn(COMMENTS_SALES.get(2));

        mvc.perform(get("/api/v1/comments/2")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(OBJECT_MAPPER.writeValueAsString(COMMENTS_SALES.get(2))))
                .andReturn();
    }


    @Test
    @WithMockOidcUser
    void upvoteComment_notFound() throws Exception {

        mvc.perform(patch("/api/v1/comments/1/upvote"))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    @WithMockOidcUser
    void upvoteComment() throws Exception {

        given(echoService.upvoteComment(eq(1L), anyString()))
                .willReturn(COMMENTS_IT.get(1).upvote().size());

        mvc.perform(patch("/api/v1/comments/1/upvote"))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void upvoteComment_WithoutUser() throws Exception {

        given(echoService.upvoteComment(eq(1L), anyString()))
                .willReturn(COMMENTS_IT.get(1).upvote().size());

        mvc.perform(patch("/api/v1/comments/1/upvote"))
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    @WithMockOidcUser
    void addCommentToEchoBoardComment_NoRequestBody() throws Exception {
        given(echoService.addCommentToEcho(eq(1L), any(), anyString()))
                .willReturn(COMMENTS_MARKET.get(2));

        mvc.perform(post("/api/v1/comments/1"))
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    @Disabled
    @WithMockOidcUser
    // TODO: Fix the test, content is null for some reason
    void addCommentToEchoBoardComment() throws Exception {
        given(echoService.addCommentToEcho(eq(1L), any(), anyString()))
                .willReturn(COMMENTS_MARKET.get(2));

        mvc.perform(post("/api/v1/comments/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(OBJECT_MAPPER.writeValueAsString(COMMENTS_MARKET.get(2))))
                .andExpect(status().isCreated())
                .andExpect(content().string(COMMENTS_MARKET.get(2).toString()))
                .andReturn();
    }

}
