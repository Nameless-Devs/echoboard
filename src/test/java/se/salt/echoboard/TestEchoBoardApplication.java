package se.salt.echoboard;

import org.springframework.boot.SpringApplication;

public class TestEchoBoardApplication {

    public static void main(String[] args) {
        SpringApplication.from(EchoBoardApplication::main)
                .with(TestContainersConfig.class)
                .run(args);
    }
}
