package info.smartkit.shiny.guide.settings;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by smartkit on 27/02/2017.
 */
@ConfigurationProperties(prefix = "spring.datasource")
@Component
public class DataBaseSettings {
    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    @Override
    public String toString() {
        return "DataBaseSettings{" +
                "server='" + server + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", database='" + database + '\'' +
                '}';
    }

    public DataBaseSettings(String server, String username, String password, String database) {
        this.server = server;
        this.username = username;
        this.password = password;
        this.database = database;
    }

    private String server;
    private String username;
    private String password;
    private String database;

    public DataBaseSettings() {
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }
}
