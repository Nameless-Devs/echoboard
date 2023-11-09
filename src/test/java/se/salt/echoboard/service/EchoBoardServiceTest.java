package se.salt.echoboard.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import se.salt.echoboard.controller.dto.DTOConvertor;
import se.salt.echoboard.controller.dto.EchoBoardResponse;
import se.salt.echoboard.exception.custom.UserNotFoundException;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.repository.EchoBoardRepository;
import se.salt.echoboard.service.repository.EchoBoardUserRepository;
import util.TestBuilders;
import org.mockito.Mockito;

import static org.junit.Assert.*;
@SpringBootTest
public class EchoBoardServiceTest {

    @InjectMocks
    private EchoBoardService echoBoardService1;

    @Mock
    private EchoBoardRepository echoBoardRepository;

    @Mock
    private EchoBoardUserRepository userRepository;

    @Mock
    private DTOConvertor convertor;

    EchoBoardUser mockedUser = TestBuilders.createRandomEchoBoardUser();

    EchoBoard mockedEchoBoard = TestBuilders.createRandomEchoBoard();

    EchoBoardResponse responseDTO = TestBuilders.createRandomEchoBoardResponse();

    @BeforeEach
    void setUp() {
        Mockito.when(userRepository.getUserBySubject("subject"))
                .thenReturn(java.util.Optional.of(mockedUser));

        Mockito.when(echoBoardRepository.save(mockedEchoBoard))
                .thenReturn(mockedEchoBoard);

        Mockito.when(convertor.convertEntityToResponseDTO(mockedEchoBoard))
                .thenReturn(responseDTO);
    }


    @Test
    @DisplayName("Should successfully save an EchoBoard instance")
    void testSaveEcho() {
        // Test the saveEcho method
        EchoBoardResponse result = echoBoardService1.saveEcho(mockedEchoBoard, "subject");

        // Assertions
        Assertions.assertEquals(mockedEchoBoard.getId(), result.id());
        Assertions.assertNotNull(result);

        // Verify that the userRepository.getUserBySubject method was called with "subject"
        Mockito.verify(userRepository).getUserBySubject("subject");

        // Verify that the echoBoardRepository.save method was called with the mockedEchoBoard
        Mockito.verify(echoBoardRepository).save(mockedEchoBoard);

        // Verify that the convertor.convertEntityToResponseDTO method was called with mockedEchoBoard
        Mockito.verify(convertor).convertEntityToResponseDTO(mockedEchoBoard);

    }

    @Test
    void testSaveEchoUserNotFound() {
        // Test the saveEcho method when the user is not found
        assertThrows(UserNotFoundException.class, () -> echoBoardService1.saveEcho(mockedEchoBoard, "user123"));
    }
}
