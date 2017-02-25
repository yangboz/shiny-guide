package info.smartkit.shiny.guide.settings;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 * Created by yangboz on 25/02/2017.
 */
@ConfigurationProperties(prefix = "uploads")
@Component
public class UploadSettings {
    //    uploads.host = http://118.190.3.169/td
//    uploads.timage = ${uploads.host}/uploads/timage/
//    uploads.tcsv = ${uploads.host}/uploads/tcsv/
    private String host;
    private String timage;
    private String tcsv;
    private String tmahout;

    public UploadSettings(String host, String timage, String tcsv, String tmahout) {
        this.host = host;
        this.timage = timage;
        this.tcsv = tcsv;
        this.tmahout = tmahout;
    }

    public UploadSettings() {

    }

    @Override
    public String toString() {
        return "UploadSettings{" +
                "host='" + host + '\'' +
                ", timage='" + timage + '\'' +
                ", tcsv='" + tcsv + '\'' +
                ", tmahout='" + tmahout + '\'' +
                '}';
    }

    public String getTmahout() {

        return tmahout;
    }

    public void setTmahout(String tmahout) {
        this.tmahout = tmahout;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getTimage() {
        return timage;
    }

    public void setTimage(String timage) {
        this.timage = timage;
    }

    public String getTcsv() {
        return tcsv;
    }

    public void setTcsv(String tcsv) {
        this.tcsv = tcsv;
    }
}
