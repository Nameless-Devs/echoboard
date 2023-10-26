package se.salt.echoboard.controller;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.EchoBoardService;
import util.TestBuilders;
import util.mock.WithMockOidcUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Mock
    private EchoBoardService echoBoardService;

    @InjectMocks
    private UserController controller;

//    public UserControllerTest(EchoBoardService echoBoardService) {
//        this.echoBoardService = echoBoardService;
//    }

    @Test
    @WithMockOidcUser
    public void testGetEchoBoardUserBySubjectWithCommentsAndSolutions() throws Exception {
        // Create a mock user using test builder
//        EchoBoardUser mockUser = TestBuilders.createRandomEchoBoardUser();
//        Mockito.when(echoBoardService.getEchoBoardUserWithCommentsAndSolutions("mockSubject"))
//                .thenReturn(mockUser);

        mockMvc.perform(get("/api/v1/user/echoboard")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").isNotEmpty())
               // .andExpect(jsonPath("$.name").value("Mock User")) // Assert other fields
                .andExpect(jsonPath("$.echoBoardComments").isArray())
                .andExpect(jsonPath("$.echoBoardSolutions").isArray());
    }
}
