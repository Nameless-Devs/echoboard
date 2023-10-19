package se.salt.echoboard.controller;

import lombok.AllArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import se.salt.echoboard.controller.dto.EchoBoardDTO;
import se.salt.echoboard.model.EchoBoard;

import java.util.List;
@ComponentScan
@Mapper(componentModel = "spring")
public interface EchoBoardMapper {
        @Bean
        @Mapping(target = "echoBoardComments", source = "echoBoardComments")
        @Mapping(target = "echoBoardSolutions", source = "echoBoardSolutions")
        EchoBoardDTO echoBoardToEchoBoardDTO(List<EchoBoard> echoBoard);
}
