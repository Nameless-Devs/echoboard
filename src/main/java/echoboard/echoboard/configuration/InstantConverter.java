package echoboard.echoboard.configuration;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;

import java.time.Instant;

public class InstantConverter implements DynamoDBTypeConverter<String, Instant> {

    @Override
    public String convert(Instant instant) {
        return instant.toString();
    }

    @Override
    public Instant unconvert(String stringValue) {
        return Instant.parse(stringValue);
    }
}
