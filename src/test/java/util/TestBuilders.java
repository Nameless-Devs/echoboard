package util;

import com.github.javafaker.Faker;
import org.mockito.Mock;
import se.salt.echoboard.controller.dto.*;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;
import se.salt.echoboard.service.EchoBoardService;
import se.salt.echoboard.service.repository.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TestBuilders {

    @Mock
    private static EchoBoardRepository echoBoardRepository;

    @Mock
    private static EchoBoardUserRepository userRepository;
    @Mock
    private static EchoBoardCommentRepository commentRepository;
    @Mock
    private static JPAChatRoomRepository chatRoomRepository;
    @Mock
    private static EchoBoardSolutionRepository solutionRepository;

    @Mock
    private static DTOConvertor convertor;

    public static EchoBoardService mockedService() {
        EchoBoardService echoBoardService = new EchoBoardService(
                echoBoardRepository, commentRepository, solutionRepository, userRepository, chatRoomRepository, convertor);
        return echoBoardService;
    }

    // Create an instance of EchoBoardService with the mocked dependencies


    private static final Faker faker = new Faker();

    public static EchoBoard createRandomEchoBoard() {

       return EchoBoard.builder()
                .id(123456)
                .title(faker.lorem().sentence())
                .content(faker.lorem().paragraph())
                .anonymous(faker.random().nextBoolean())
                .echoBoardUser(createRandomEchoBoardUser())
                .created(Instant.now())
                .build();


    }

    public static EchoBoardResponse createRandomEchoBoardResponse() {

        return EchoBoardResponse.builder()
                .id(123456)
                .title(faker.lorem().sentence())
                .content(faker.lorem().paragraph())
                .created(Instant.now())
                .anonymous(faker.random().nextBoolean())
                .echoBoardComments(List.of())
                .echoBoardSolutions(List.of())
                .echoBoardUser(createRandomEchoBoardUserResponse())
                .build();
    }

    public static EchoBoardUser createRandomEchoBoardUser() {

        return new EchoBoardUser(
                "subject",
                "John Doe",
                "john@example.com",
                "image-url",
                List.of(), List.of(), List.of(), List.of());
    }



    public static EchoBoardUserResponse createRandomEchoBoardUserResponse() {

        return EchoBoardUserResponse.builder()
                .name("John Doe")
                .picture("image-url")
                .build();
    }


    public static EchoBoardComment createRandomEchoBoardComment() {
        EchoBoardComment comment = EchoBoardComment.builder()
                .created(Instant.now())
                .id(faker.number().randomNumber())
                .anonymous(faker.random().nextBoolean())
                .echoBoardUser(createRandomEchoBoardUser())
                .content(faker.lorem().paragraph())
                .build();
        comment.addCommentToEchoBoardComment(comment);
        return comment;
    }

    public static EchoBoardCommentResponse createRandomEchoBoardCommentResponse() {
        return EchoBoardCommentResponse.builder()
                .created(Instant.now())
                .id(faker.number().randomNumber())
                .anonymous(faker.random().nextBoolean())
                .echoBoardUser(createRandomEchoBoardUserResponse())
                .content(faker.lorem().paragraph())
                .build();
    }



    public static EchoBoardSolution createRandomEchoBoardSolution() {

        return EchoBoardSolution.builder()
        .anonymous(faker.random().nextBoolean())
        .created(Instant.now())
        .id(faker.number().randomNumber())
        .status(EchoBoardSolution.SolutionStatus.SOLVED)
        .echoBoardUser(createRandomEchoBoardUser())
        .content(faker.lorem().paragraph()).build();

    }

    public static EchoBoardSolutionResponse mockedEchoBoardSolutionResponse() {
        return EchoBoardSolutionResponse.builder()
                .id(faker.number().randomNumber())
                .content(faker.lorem().paragraph())
                .anonymous(true)
                .created(Instant.now())
                .echoBoardUser(createRandomEchoBoardUserResponse())
                .status(EchoBoardSolution.SolutionStatus.SOLVED)
                .build();
    }

    public static EchoBoardUserInfo mockedEchoBoardUserInfo() {

        return EchoBoardUserInfo.builder()
                .name("John Doe")
                .picture("image-url")
                .echoBoardComments(List.of())
                .echoBoardSolutions(List.of())
                .echoBoards(List.of())
                .build();
    }
}
