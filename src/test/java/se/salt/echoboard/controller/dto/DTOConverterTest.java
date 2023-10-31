package se.salt.echoboard.controller.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;
import util.TestBuilders;

import java.util.List;

import static org.junit.Assert.assertEquals;
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
        Assertions.assertEquals(echoBoardUser.getName(), actualResponse.name());
        Assertions.assertEquals(echoBoardUser.getPicture(), actualResponse.picture());

    }

    @Test
    @Disabled
    @DisplayName("Should map EchoBoardUser to EchoBoardUserInfo")
    public void testEchoBoardUserToEchoBoardUserInfo() {

        EchoBoardUser echoBoardUser = TestBuilders.createRandomEchoBoardUser();

        EchoBoardUserInfo expectedUserInfo =  TestBuilders.mockedEchoBoardUserInfo();

        when(objectMapper.convertValue(echoBoardUser, EchoBoardUserInfo.class)).thenReturn(TestBuilders.mockedEchoBoardUserInfo());

        EchoBoardUserInfo actualUserInfo = dtoConvertor.convertEntityToEchoBoardUserWithInfoDTO(echoBoardUser);

        List<EchoBoardComment> expectedComments = echoBoardUser.getEchoBoardComments();

        List<EchoBoardCommentResponse> actualComments = actualUserInfo.echoBoardComments();

        List<EchoBoardSolution> expectedSolutions = echoBoardUser.getEchoBoardSolutions();

        List<EchoBoardSolutionResponse> actualSolutions = actualUserInfo.echoBoardSolutions();

        Assertions.assertEquals(expectedUserInfo, actualUserInfo);
        Assertions.assertEquals(echoBoardUser.getEchoBoardComments().size(), actualUserInfo.echoBoardComments().size());
        Assertions.assertEquals(echoBoardUser.getName(), actualUserInfo.name());
        Assertions.assertEquals(expectedComments, actualComments);
        Assertions.assertEquals(expectedSolutions, actualSolutions);

        for (int i = 0; i < expectedComments.size(); i++) {
            EchoBoardComment expected = expectedComments.get(i);
            EchoBoardCommentResponse actual = actualComments.get(i);

            Assertions.assertEquals(expected.getId(), actual.id());
            Assertions.assertEquals(expected.getContent(), actual.content());
            Assertions.assertEquals(expected.getCreated(), actual.created());
            Assertions.assertEquals(expected.isAnonymous(), actual.anonymous());
        }

        for (int i = 0; i < expectedSolutions.size(); i++) {
            EchoBoardSolution expected = expectedSolutions.get(i);
            EchoBoardSolutionResponse actual = actualSolutions.get(i);

            Assertions.assertEquals(expected.getId(), actual.id());
            Assertions.assertEquals(expected.getContent(), actual.content());
            Assertions.assertEquals(expected.getCreated(), actual.created());
            Assertions.assertEquals(expected.isAnonymous(), actual.anonymous());
        }
    }

    @Test
    @Disabled
    @DisplayName("Should map EchoBoard to EchoBoardResponse")
    public void testConvertEchoBoardToEchoBoardResponse() {

        EchoBoard echoBoard = TestBuilders.createRandomEchoBoard();

        EchoBoardResponse expectedResponse = TestBuilders.createRandomEchoBoardResponse();

        when(objectMapper.convertValue(echoBoard, EchoBoardResponse.class)).thenReturn(expectedResponse);

        EchoBoardResponse actualResponse = dtoConvertor.convertEntityToResponseDTO(echoBoard);

        Assertions.assertEquals(expectedResponse, actualResponse);
        Assertions.assertEquals(echoBoard.getId(), actualResponse.id());
        Assertions.assertEquals(expectedResponse.title(), actualResponse.title());

    }
}
