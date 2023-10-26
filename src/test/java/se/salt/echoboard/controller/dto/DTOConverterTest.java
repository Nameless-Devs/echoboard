package se.salt.echoboard.controller.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import se.salt.echoboard.model.EchoBoard;
import util.TestBuilders;

import static org.mockito.Mockito.when;
import static util.TestUtilities.OBJECT_MAPPER;
@SpringBootTest
public class DTOConverterTest {


    private final DTOConvertor convert = new DTOConvertor(OBJECT_MAPPER);

    @Test
    @Disabled
    public void testEchoBoardToEchoBoardDTO() {
        // Create an instance of EchoBoard
        EchoBoard echoBoard = EchoBoard.builder().build();
        //EchoBoard echoBoard = TestBuilders.createRandomEchoBoard();
        System.out.println("ECHOBOARD: "+echoBoard);
        // Set properties on the echoBoard object

//        var expectedDTO = EchoBoardUserInfo.builder().build(); // Replace with your expected DTO
       // when(OBJECT_MAPPER.convertValue(echoBoard, EchoBoardDTO.class)).thenReturn(expectedDTO);

        // Perform the mapping
        var echoBoardDTO = convert.convertEntityToEchoBoardDtoTest(echoBoard.getEchoBoardUser());

        // Verify that the mapping is correct
        //Assertions.assertEquals(echoBoard.getEchoBoardComments(), echoBoardDTO.echoBoardComments);
        Assertions.assertEquals(expectedDTO, echoBoardDTO);
        // Add more assertions for other properties as needed
    }
}
