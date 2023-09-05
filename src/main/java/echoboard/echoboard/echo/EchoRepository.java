package echoboard.echoboard.echo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class EchoRepository {

    private final DynamoDBMapper dynamoDBMapper;

    public EchoRepository(DynamoDBMapper dynamoDBMapper){
        this.dynamoDBMapper = dynamoDBMapper;
    }

//    public Iterable<Echo> getAllEchoes() {
//        return dynamoDBMapper.
//    }

    public Echo save(Echo echo) {
        dynamoDBMapper.save(echo);
        return echo;
    }

    public Optional<Echo> getEchoById(long id) {
        return Optional.ofNullable(dynamoDBMapper.load(Echo.class, id));
    }
}
