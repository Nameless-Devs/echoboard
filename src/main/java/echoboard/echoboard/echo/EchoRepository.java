package echoboard.echoboard.echo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class EchoRepository {

    private final DynamoDBMapper dynamoDBMapper;

    public EchoRepository(DynamoDBMapper dynamoDBMapper){
        this.dynamoDBMapper = dynamoDBMapper;
    }

    public EchoBoard save(EchoBoard echoBoard) {
        dynamoDBMapper.save(echoBoard);
        return echoBoard;
    }

    public EchoBoard addComment(EchoBoard echo) {
        dynamoDBMapper.save(echo);
        return echo;
    }

    public Optional<EchoBoard> getEchoById(String id) {
        return Optional.ofNullable(dynamoDBMapper.load(EchoBoard.class, id));
    }
}
