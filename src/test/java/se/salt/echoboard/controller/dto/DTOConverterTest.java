package se.salt.echoboard.controller.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import se.salt.echoboard.model.EchoBoardUser;
import util.TestBuilders;

import static org.mockito.Mockito.when;
@SpringBootTest
public class DTOConverterTest {
    private DTOConvertor dtoConvertor;

    @Mock
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
        dtoConvertor = new DTOConvertor(objectMapper);
    }

    @Test
    @Disabled
    @DisplayName("Should map EchoBoardUser to EchoBoardUserResponse")
    public void testEchoBoardUserToEchoBoardUserResponse() {

        EchoBoardUser echoBoardUser = TestBuilders.createRandomEchoBoardUser();

        EchoBoardUserResponse expectedResponse = TestBuilders.createRandomEchoBoardUserResponse();

        when(objectMapper.convertValue(echoBoardUser, EchoBoardUserResponse.class)).thenReturn(expectedResponse);

        EchoBoardUserResponse actualResponse = dtoConvertor.convertEntityToResponseDTO(echoBoardUser);

        Assertions.assertEquals(expectedResponse, actualResponse);

    }
}
