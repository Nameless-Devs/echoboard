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

    public EchoBoardUserResponse convertEntityToResponseDTO(EchoBoardUser echoBoardUser) {
        return mapper.convertValue(echoBoardUser, EchoBoardUserResponse.class);
    }

    public EchoBoardUserInfo convertEntityToEchoBoardUserWithInfoDTO(EchoBoardUser echoBoardUser) {
        return mapper.convertValue(echoBoardUser, EchoBoardUserInfo.class);
    }

    public EchoBoardResponse convertEntityToResponseDTO(EchoBoard echoBoard) {
        return mapper.convertValue(echoBoard, EchoBoardResponse.class);
    }

    public EchoBoardSolutionResponse convertEntityToResponseDTO(EchoBoardSolution echoBoardSolution) {
        return mapper.convertValue(echoBoardSolution, EchoBoardSolutionResponse.class);
    }

    public EchoBoardCommentResponse convertEntityToResponseDTO(EchoBoardComment echoBoardComment) {
        return mapper.convertValue(echoBoardComment, EchoBoardCommentResponse.class);
    }

    public EchoBoardPreview convertEntityToResponsePreviewDTO(EchoBoard echoBoard) {
        return mapper.convertValue(echoBoard, EchoBoardPreview.class);
    }
}
