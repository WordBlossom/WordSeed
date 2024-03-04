FROM openjdk:18-jdk-slim
RUN mkdir /srv/docker-server
WORKDIR /srv/docker-server
COPY ./ ./
CMD chmod +x ./gradlew && ./gradlew bootJar && java -jar ./build/libs/*.jar