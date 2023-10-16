package se.salt.echoboard.controller.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;

@Component
@AllArgsConstructor
public class DTOConvertor {

    private final ObjectMapper mapper;

    public EchoBoardResponseDto convertEntityToResponseDto(EchoBoard echoBoard) {
        return mapper.convertValue(echoBoard, EchoBoardResponseDto.class);
    }

    public EchoBoardSolutionResponseDto convertEntityToResponseDto(EchoBoardSolution echoBoardSolution) {
        return mapper.convertValue(echoBoardSolution, EchoBoardSolutionResponseDto.class);
    }

    public EchoBoardCommentResponseDto convertEntityToResponseDto(EchoBoardComment echoBoardComment) {
        return mapper.convertValue(echoBoardComment, EchoBoardCommentResponseDto.class);
    }

    public <T, D extends Record> D convertEntityToResponseDto(T entity) {
        Class<D> dtoClass = getDtoClassFromEntityClass(entity.getClass());
        return mapper.convertValue(entity, dtoClass);
    }

    /**
     * Gets the DTO class for an entity class.
     * The DtoConvertor class must be in the same package as the DTO.
     * The Dto must be named correctly, Entity Class name + ResponseDto
     *
     * @param entityClass The entity class.
     * @return The DTO class.
     */
    @SuppressWarnings("unchecked")
    private <T, D extends Record> Class<D> getDtoClassFromEntityClass(Class<T> entityClass) {
        String dtoClassName = entityClass.getSimpleName() + "ResponseDto";
        try {
            return (Class<D>) Class.forName(DTOConvertor.class.getPackage().getName() + "." + dtoClassName);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("DTO class not found: " + dtoClassName, e);
        }
    }
}
