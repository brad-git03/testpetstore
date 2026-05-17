FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /workspace

COPY pom.xml .
COPY src ./src

RUN mvn -B -DskipTests package \
	&& JAR_FILE=$(ls target/*.jar | grep -v '\\.original$' | head -n 1) \
	&& cp "$JAR_FILE" /tmp/app.jar

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /tmp/app.jar /app/app.jar

EXPOSE 8080

ENV PORT=8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]