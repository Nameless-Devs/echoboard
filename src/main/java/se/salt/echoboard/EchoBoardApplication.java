package se.salt.echoboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@ConfigurationPropertiesScan
public class EchoBoardApplication {

    public static void main(String[] args) {
        SpringApplication.run(EchoBoardApplication.class, args);
    }

}
