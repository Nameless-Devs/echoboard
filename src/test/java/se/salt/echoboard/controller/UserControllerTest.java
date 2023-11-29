package se.salt.echoboard.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import se.salt.echoboard.TestContainersConfig;
import util.mock.WithMockOidcUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Import(TestContainersConfig.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockOidcUser
    public void testGetEchoBoardUserBySubjectWithCommentsAndSolutions() throws Exception {
        // Create a mock user using test builder
//        EchoBoardUser mockUser = TestBuilders.createRandomEchoBoardUser();
//        Mockito.when(echoBoardService.getEchoBoardUserWithCommentsAndSolutions("mockSubject"))
//                .thenReturn(mockUser);

        mockMvc.perform(get("/api/v1/user/info")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").isNotEmpty())
               // .andExpect(jsonPath("$.name").value("Mock User")) // Assert other fields
                .andExpect(jsonPath("$.echoBoards").isArray())
                .andExpect(jsonPath("$.echoBoardComments").isArray())
                .andExpect(jsonPath("$.echoBoardSolutions").isArray());

    }
}
