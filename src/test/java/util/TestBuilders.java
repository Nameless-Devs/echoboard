package util;

import com.github.javafaker.Faker;
import se.salt.echoboard.controller.dto.EchoBoardDTO;
import se.salt.echoboard.model.EchoBoard;
import se.salt.echoboard.model.EchoBoardComment;
import se.salt.echoboard.model.EchoBoardSolution;
import se.salt.echoboard.model.EchoBoardUser;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
public class TestBuilders {

    private static final Faker faker = new Faker();

    public static EchoBoard createRandomEchoBoard() {

        EchoBoard echoBoard = EchoBoard.builder()
                .id(faker.number().randomNumber())
                .title(faker.lorem().sentence())
                .content(faker.lorem().paragraph())
                .anonymous(faker.random().nextBoolean())
                .echoBoardUser(createRandomEchoBoardUser())
                .created(Instant.now())
                .build();

        // Create random EchoBoardComments
        int numComments = faker.number().numberBetween(0, 5);
        for (int i = 0; i < numComments; i++) {
            EchoBoardComment comment = createRandomEchoBoardComment();
            echoBoard.addComment(comment);
        }

        // Create random EchoBoardSolutions
        int numSolutions = faker.number().numberBetween(0, 3);
        for (int i = 0; i < numSolutions; i++) {
            EchoBoardSolution solution = createRandomEchoBoardSolution();
            echoBoard.addSolution(solution);
        }

        // Add random upvotes
        int numUpvotes = faker.number().numberBetween(0, 10);
        for (int i = 0; i < numUpvotes; i++) {
            echoBoard.addUpvote(faker.internet().uuid());
        }
        return echoBoard;
    }

    private static EchoBoardUser createRandomEchoBoardUser() {

        return EchoBoardUser.builder()
                .subject(faker.internet().uuid())
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



    public static EchoBoardSolution createRandomEchoBoardSolution() {

        EchoBoardSolution.EchoBoardSolutionBuilder builder = EchoBoardSolution.builder();
        builder.anonymous(faker.random().nextBoolean());
        builder.created(Instant.now());
        builder.id(faker.number().randomNumber());
        builder.status(EchoBoardSolution.SolutionStatus.SOLVED);
        builder.echoBoardUser(createRandomEchoBoardUser());
        builder.content(faker.lorem().paragraph());
        EchoBoardSolution solution = builder
                .build();
//        solution.addVolunteer(createRandomEchoBoardUser());
        return solution;
    }

    public static EchoBoardDTO mockedEchoBoardDTO() {
        List<EchoBoardComment> comment = new ArrayList<>();
        comment.add(createRandomEchoBoardComment());

        List<EchoBoardSolution> solution = new ArrayList<>();
        solution.add(createRandomEchoBoardSolution());

        return EchoBoardDTO.builder()
                .echoBoardComments(comment)
                .echoBoardSolutions(solution)
                .build();
    }
}
