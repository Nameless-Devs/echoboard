package echoboard.echoboard;

import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import echoboard.echoboard.echo.EchoBoard;
import echoboard.echoboard.echo.EchoController;
import echoboard.echoboard.echo.EchoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(EchoController.class)
public class getAllEchoesTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EchoService echoService;

    @Test
    public void testGetAllEchoesReturnsOk() throws Exception {
        List<EchoBoard> mockEchoes = Collections.singletonList(new EchoBoard());

        PaginatedScanList<EchoBoard> mockedScanList = mock(PaginatedScanList.class);
        when(mockedScanList.isEmpty()).thenReturn(false);
        when(mockedScanList.iterator()).thenReturn(mockEchoes.iterator());

        when(echoService.getAllEchoes(anyInt(), any())).thenReturn(mockedScanList);

        mockMvc.perform(get("/echoes").param("limit", "1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllEchoesReturnsNoContent() throws Exception {
        PaginatedScanList<EchoBoard> emptyMockedList = mock(PaginatedScanList.class);
        when(emptyMockedList.isEmpty()).thenReturn(true);

        when(echoService.getAllEchoes(anyInt(), any())).thenReturn(emptyMockedList);

        mockMvc.perform(get("/echoes").param("limit", "1"))
                .andExpect(status().isNoContent());
    }

}
