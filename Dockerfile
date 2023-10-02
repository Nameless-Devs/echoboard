FROM amazoncorretto:17.0.8-alpine3.18

WORKDIR /app

COPY /target/echoboard-0.0.1-SNAPSHOT.jar echoboard-0.0.1-SNAPSHOT.jar

EXPOSE 8080
ENV SERVER_PORT=8080

ENTRYPOINT ["java", "-jar", "echoboard-0.0.1-SNAPSHOT.jar"]
