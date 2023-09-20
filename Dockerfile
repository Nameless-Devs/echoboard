FROM amazoncorretto:17.0.8-alpine3.18

LABEL maintainer="Your Name <ibrahim@ebs.net.pk>"
LABEL description="Dockerfile for the EchoBoard Application"

EXPOSE 8080
ENV SERVER_PORT=8080

COPY target/echoboard-0.0.1-SNAPSHOT.jar echoboard-0.0.1-SNAPSHOT.jar
WORKDIR /app

ENTRYPOINT ["java","-jar","/echoboard-0.0.1-SNAPSHOT.jar"]