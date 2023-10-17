package se.salt.echoboard.controller.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import se.salt.echoboard.model.EchoBoard;

@Mapper
public interface EchoBoardMapper {
        @Mapping(target = "echoBoardComments", source = "echoBoardComments")
        @Mapping(target = "echoBoardSolutions", source = "echoBoardSolutions")
        EchoBoardDTO echoBoardToEchoBoardDTO(EchoBoard echoBoard);
}
