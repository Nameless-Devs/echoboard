package echoboard.echoboard.echo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
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

    public Optional<EchoBoard> getEchoById(String id) {
        return Optional.ofNullable(dynamoDBMapper.load(EchoBoard.class, id));
    }

    public PaginatedScanList<EchoBoard> findAll(int limit, Map<String, AttributeValue> lastKey) {
        System.out.println(limit);
        System.out.println(lastKey);
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withLimit(limit)
                .withExclusiveStartKey(lastKey);

        return dynamoDBMapper.scan(EchoBoard.class, scanExpression);
    }
}
