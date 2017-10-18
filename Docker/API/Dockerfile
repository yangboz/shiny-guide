FROM java:8
VOLUME /tmp
WORKDIR /itdas
ADD target/data-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8095
RUN bash -c "touch /app.jar"
ENTRYPOINT ["java","-Dspring.datasource.url=mysql://mysql:3306/td_test", "-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]