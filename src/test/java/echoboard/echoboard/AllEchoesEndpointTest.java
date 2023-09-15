package echoboard.echoboard;

import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.fasterxml.jackson.databind.ObjectMapper;
import echoboard.echoboard.echo.EchoBoard;
import echoboard.echoboard.echo.EchoController;
import echoboard.echoboard.echo.EchoService;
import echoboard.echoboard.security.config.ApplicationNoSecurity;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(EchoController.class)
@ActiveProfiles("test")
@ContextConfiguration(classes = { EchoboardApplication.class, ApplicationNoSecurity.class })
public class AllEchoesEndpointTest {

    private final MockMvc mockMvc;

    @MockBean
    private EchoService echoService;

    private final ObjectMapper objectMapper;

    @Autowired
    public AllEchoesEndpointTest(ObjectMapper objectMapper, MockMvc mockMvc) {
        this.objectMapper = objectMapper;
        this.mockMvc = mockMvc;
    }


    @Test
    public void testGetAllEchoesReturnsOk() throws Exception {
        List<EchoBoard> mockEchoes = Arrays.asList(
                new EchoBoard("as","asd","asdasd"),
                new EchoBoard("as","asda","asdasd")
        );

        String expectedJson = objectMapper.writeValueAsString(mockEchoes);

        PaginatedScanList mockedScanList = mock(PaginatedScanList.class);
        when(mockedScanList.isEmpty()).thenReturn(false);
        when(mockedScanList.iterator()).thenReturn(mockEchoes.iterator());

        when(echoService.getAllEchoes(anyInt(), any())).thenReturn(mockedScanList);

        mockMvc.perform(get("/api/echoes").param("limit", "1"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
    }

    @Test
    public void testGetAllEchoesReturnsNoContent() throws Exception {
        PaginatedScanList<EchoBoard> emptyMockedList = mock(PaginatedScanList.class);
        when(emptyMockedList.isEmpty()).thenReturn(true);

        when(echoService.getAllEchoes(anyInt(), any())).thenReturn(emptyMockedList);

        mockMvc.perform(get("/api/echoes").param("limit", "1"))
                .andExpect(status().isNoContent());


    }

}
