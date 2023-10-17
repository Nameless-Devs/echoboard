package se.salt.echoboard.controller.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;

@Component
@AllArgsConstructor
public class DTOConvertor {

    private final ObjectMapper mapper;

    public EchoBoardUserResponseDTO convertEntityToResponseDTO(EchoBoardUser echoBoardUser) {
        return mapper.convertValue(echoBoardUser, EchoBoardUserResponseDTO.class);
    }

    public EchoBoardResponseDTO convertEntityToResponseDTO(EchoBoard echoBoard) {
        return mapper.convertValue(echoBoard, EchoBoardResponseDTO.class);
    }

    public EchoBoardSolutionResponseDTO convertEntityToResponseDTO(EchoBoardSolution echoBoardSolution) {
        return mapper.convertValue(echoBoardSolution, EchoBoardSolutionResponseDTO.class);
    }

    public EchoBoardCommentResponseDTO convertEntityToResponseDTO(EchoBoardComment echoBoardComment) {
        return mapper.convertValue(echoBoardComment, EchoBoardCommentResponseDTO.class);
    }

}
