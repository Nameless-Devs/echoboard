package echoboard.echoboard.configuration;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;

import java.time.Instant;

/**
 * Converts between Java Instant objects and their DynamoDB representation as Strings.
 * DynamoDB requires a custom converter because it does not natively support Instant.
 * This converter allows you to store and retrieve Instant objects in DynamoDB attributes.
 */

public class InstantConverter implements DynamoDBTypeConverter<String, Instant> {

    /**
     * Converts an Instant to its DynamoDB string representation.
     *
     * @param instant The Instant to convert.
     * @return The string representation of the Instant.
     */
    @Override
    public String convert(Instant instant) {
        return instant.toString();
    }

    /**
     * Converts a DynamoDB string representation to an Instant.
     *
     * @param stringValue The string value from DynamoDB.
     * @return The corresponding Instant.
     */
    @Override
    public Instant unconvert(String stringValue) {
        return Instant.parse(stringValue);
    }
}
