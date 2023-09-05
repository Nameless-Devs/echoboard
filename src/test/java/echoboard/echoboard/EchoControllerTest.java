package echoboard.echoboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import echoboard.echoboard.echo.Echo;
import echoboard.echoboard.echo.EchoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class EchoControllerTest {

    private final MockMvc mockMvc;

    @MockBean
    private final EchoService echoService;

    private final ObjectMapper objectMapper;

    @Autowired
    public EchoControllerTest(MockMvc mockMvc, EchoService echoService, ObjectMapper objectMapper) {
        this.mockMvc = mockMvc;
        this.echoService = echoService;
        this.objectMapper = objectMapper;
    }

    @Test
    public void testGetStatus() throws Exception {
        mockMvc.perform(get("/api/status"))
                .andExpect(status().isOk())
                .andExpect(content().string("Server is up and running!"));
    }

    @Test
    public void testGetAllEchoes() throws Exception {

        Echo echo = new Echo("Title1", "Content1", "Author1");

        String expectedJson = objectMapper.writeValueAsString(echo);

        when(echoService.getEchoById("87cd7c4d-f284-4d22-838f-d95ec94e34dc")).thenReturn(Optional.of(echo));

        mockMvc.perform(get("/api/echoes"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }

}