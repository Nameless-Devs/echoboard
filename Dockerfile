# Stage 1: Build the application using Maven
FROM maven:3.8.4-openjdk-17-slim AS build

LABEL maintainer="Ibrahim Iqbal <ibrahim@ebs.net.pk>"
LABEL description="Dockerfile for the EchoBoard Application"

WORKDIR /app

# Copy only the Maven project files and dependencies first
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -Dmaven.test.skip

# Stage 2: Create a lightweight image for running the application
FROM amazoncorretto:17.0.8-alpine3.18

WORKDIR /app

# Copy the JAR file built in Stage 1
COPY --from=build /app/target/echoboard-0.0.1-SNAPSHOT.jar echoboard-0.0.1-SNAPSHOT.jar

EXPOSE 8080
ENV SERVER_PORT=8080

ENTRYPOINT ["java", "-jar", "echoboard-0.0.1-SNAPSHOT.jar"]
