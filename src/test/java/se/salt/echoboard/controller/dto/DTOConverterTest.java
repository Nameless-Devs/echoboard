package se.salt.echoboard.controller.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.salt.echoboard.model.EchoBoard;
import util.TestBuilders;

import static org.mockito.Mockito.when;

@SpringBootTest
public class DTOConverterTest {
    @Autowired
    private final DTOConvertor convert;

    @Autowired
    private ObjectMapper objectMapper;

    public DTOConverterTest(DTOConvertor convert, ObjectMapper objectMapper) {
        this.convert = convert;
        this.objectMapper = objectMapper;
    }


    @Test
    public void testEchoBoardToEchoBoardDTO() {
        // Create an instance of EchoBoard
        EchoBoard echoBoard = TestBuilders.createRandomEchoBoard();
        // Set properties on the echoBoard object

        EchoBoardDTO expectedDTO = new EchoBoardDTO(); // Replace with your expected DTO
        when(objectMapper.convertValue(echoBoard, EchoBoardDTO.class)).thenReturn(expectedDTO);

        // Perform the mapping
        EchoBoardDTO echoBoardDTO = convert.convertEntityToEchoBoardDto(echoBoard);

        // Verify that the mapping is correct
        //Assertions.assertEquals(echoBoard.getEchoBoardComments(), echoBoardDTO.echoBoardComments);
        Assertions.assertEquals(expectedDTO, echoBoardDTO);
        // Add more assertions for other properties as needed
    }
}
