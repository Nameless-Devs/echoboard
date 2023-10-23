package se.salt.echoboard.controller.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import se.salt.echoboard.model.EchoBoard;
import util.TestBuilders;

import static org.mockito.Mockito.when;
import static util.TestUtilities.OBJECT_MAPPER;

public class DTOConverterTest {


    private final DTOConvertor convert = new DTOConvertor(OBJECT_MAPPER);

    @Test
    public void testEchoBoardToEchoBoardDTO() {
        // Create an instance of EchoBoard
        EchoBoard echoBoard = TestBuilders.createRandomEchoBoard();
        // Set properties on the echoBoard object

        EchoBoardDTO expectedDTO = EchoBoardDTO.builder().build(); // Replace with your expected DTO
        when(OBJECT_MAPPER.convertValue(echoBoard, EchoBoardDTO.class)).thenReturn(expectedDTO);

        // Perform the mapping
        EchoBoardDTO echoBoardDTO = convert.convertEntityToEchoBoardDto(echoBoard);

        // Verify that the mapping is correct
        //Assertions.assertEquals(echoBoard.getEchoBoardComments(), echoBoardDTO.echoBoardComments);
        Assertions.assertEquals(expectedDTO, echoBoardDTO);
        // Add more assertions for other properties as needed
    }
}
