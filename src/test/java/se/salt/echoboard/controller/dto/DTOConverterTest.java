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
    @DisplayName("Should map EchoBoardUser to EchoBoardUserResponse")
    public void testEchoBoardUserToEchoBoardUserResponse() {

        EchoBoardUser echoBoardUser = TestBuilders.createRandomEchoBoardUser();

        EchoBoardUserResponse expectedResponse = TestBuilders.createRandomEchoBoardUserResponse();

        when(objectMapper.convertValue(echoBoardUser, EchoBoardUserResponse.class)).thenReturn(expectedResponse);

        EchoBoardUserResponse actualResponse = dtoConvertor.convertEntityToResponseDTO(echoBoardUser);

        Assertions.assertEquals(expectedResponse, actualResponse);
        Assertions.assertEquals(expectedResponse.name(), actualResponse.name());
        Assertions.assertEquals(expectedResponse.picture(), actualResponse.picture());

    }

    @Test
    @DisplayName("Should map EchoBoardUser to EchoBoardUserInfo")
    public void testEchoBoardUserToEchoBoardUserInfo() {

        EchoBoardUser echoBoardUser = TestBuilders.createRandomEchoBoardUser();

        EchoBoardUserInfo expectedUserInfo =  TestBuilders.mockedEchoBoardUserInfo();

        when(objectMapper.convertValue(echoBoardUser, EchoBoardUserInfo.class)).thenReturn(TestBuilders.mockedEchoBoardUserInfo());

        EchoBoardUserInfo actualUserInfo = dtoConvertor.convertEntityToEchoBoardUserWithInfoDTO(echoBoardUser);

        Assertions.assertEquals(expectedUserInfo, actualUserInfo);
        Assertions.assertEquals(expectedUserInfo.echoBoardComments().size(), actualUserInfo.echoBoardComments().size());
        Assertions.assertEquals(expectedUserInfo.name(), actualUserInfo.name());
        Assertions.assertEquals(expectedUserInfo.echoBoardComments(), actualUserInfo.echoBoardComments());
        Assertions.assertEquals(expectedUserInfo.echoBoardSolutions(), actualUserInfo.echoBoardSolutions());
        Assertions.assertEquals(expectedUserInfo.echoBoards(), actualUserInfo.echoBoards());

    }

    @Test
    @DisplayName("Should map EchoBoard to EchoBoardResponse")
    public void testConvertEchoBoardToEchoBoardResponse() {

        EchoBoard echoBoard = TestBuilders.createRandomEchoBoard();

        EchoBoardResponse expectedResponse = TestBuilders.createRandomEchoBoardResponse();

        when(objectMapper.convertValue(echoBoard, EchoBoardResponse.class)).thenReturn(expectedResponse);

        EchoBoardResponse actualResponse = dtoConvertor.convertEntityToResponseDTO(echoBoard);

        Assertions.assertEquals(expectedResponse, actualResponse);
        Assertions.assertEquals(expectedResponse.id(), actualResponse.id());
        Assertions.assertEquals(expectedResponse.title(), actualResponse.title());
        Assertions.assertEquals(expectedResponse.content(), actualResponse.content());
        Assertions.assertEquals(expectedResponse.anonymous(), actualResponse.anonymous());
        Assertions.assertEquals(expectedResponse.upvote(), actualResponse.upvote());
        Assertions.assertEquals(expectedResponse.echoBoardSolutions(), actualResponse.echoBoardSolutions());
        Assertions.assertEquals(expectedResponse.echoBoardComments(), actualResponse.echoBoardComments());
        Assertions.assertEquals(expectedResponse.echoBoardUser(), actualResponse.echoBoardUser());

    }

    @Test
    @DisplayName("Should map EchoBoardSolution to EchoBoardUserSolutionResponse")
    public void testEchoBoardSolutionToEchoBoardSolutionResponse() {

        EchoBoardSolution echoBoardSolution = TestBuilders.createRandomEchoBoardSolution();

        EchoBoardSolutionResponse expectedResponse = TestBuilders.mockedEchoBoardSolutionResponse();

        when(objectMapper.convertValue(echoBoardSolution, EchoBoardSolutionResponse.class)).thenReturn(expectedResponse);

        EchoBoardSolutionResponse actualResponse = dtoConvertor.convertEntityToResponseDTO(echoBoardSolution);

        Assertions.assertEquals(expectedResponse, actualResponse);
        Assertions.assertEquals(expectedResponse.id(), actualResponse.id());
        Assertions.assertEquals(expectedResponse.anonymous(), actualResponse.anonymous());
        Assertions.assertEquals(expectedResponse.created(), actualResponse.created());
        Assertions.assertEquals(expectedResponse.content(), actualResponse.content());
        Assertions.assertEquals(expectedResponse.echoBoardUser(), actualResponse.echoBoardUser());
        Assertions.assertEquals(expectedResponse.volunteers(), actualResponse.volunteers());
        Assertions.assertEquals(expectedResponse.upvote(), actualResponse.upvote());
        Assertions.assertEquals(expectedResponse.chatRoom(), actualResponse.chatRoom());
        Assertions.assertEquals(expectedResponse.status(), actualResponse.status());

    }

    @Test
    @DisplayName("Should map EchoBoardComment to EchoBoardCommentResponse")
    public void testEchoBoardCommentToEchoBoardCommentResponse() {

        EchoBoardComment echoBoardComment = TestBuilders.createRandomEchoBoardComment();

        EchoBoardCommentResponse expectedResponse = TestBuilders.createRandomEchoBoardCommentResponse();

        when(objectMapper.convertValue(echoBoardComment, EchoBoardCommentResponse.class)).thenReturn(expectedResponse);

        EchoBoardCommentResponse actualResponse = dtoConvertor.convertEntityToResponseDTO(echoBoardComment);

        Assertions.assertEquals(expectedResponse, actualResponse);
        Assertions.assertEquals(expectedResponse.id(), actualResponse.id());
        Assertions.assertEquals(expectedResponse.content(), actualResponse.content());
        Assertions.assertEquals(expectedResponse.created(), actualResponse.created());
        Assertions.assertEquals(expectedResponse.upvote(), actualResponse.upvote());
        Assertions.assertEquals(expectedResponse.anonymous(), actualResponse.anonymous());
        Assertions.assertEquals(expectedResponse.echoBoardUser(), actualResponse.echoBoardUser());
        Assertions.assertEquals(expectedResponse.echoBoardComments(), actualResponse.echoBoardComments());

    }
}
