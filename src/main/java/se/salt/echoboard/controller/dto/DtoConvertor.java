package se.salt.echoboard.controller.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DtoConvertor {

    private final ObjectMapper mapper;

    public <T, D> D convertEntityToResponseDto(T entity) {
        Class<D> dtoClass = getDtoClassFromEntityClass(entity.getClass());
        return mapper.convertValue(entity, dtoClass);
    }

    /**
     * Gets the DTO class for an entity class.
     * The DtoConvertor class must be in the same package as the DTO.
     * The Dto must be named correctly, Entity Class name + ResponseDto
     * @param entityClass The entity class.
     * @return The DTO class.
     */
    @SuppressWarnings("unchecked")
    private <T, D> Class<D> getDtoClassFromEntityClass(Class<T> entityClass) {
        String dtoClassName = entityClass.getSimpleName() + "ResponseDto";
        try {
            return (Class<D>) Class.forName(DtoConvertor.class.getPackage().getName() + "." + dtoClassName);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("DTO class not found: " + dtoClassName, e);
        }
    }
}
