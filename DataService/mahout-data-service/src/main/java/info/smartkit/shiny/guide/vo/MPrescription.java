package info.smartkit.shiny.guide.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by yangboz on 23/02/2017.
 * Medical prescription.
 */
@Entity
public class MPrescription implements Serializable {
    private
    static final long serialVersionUID = -8473185797276849677L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String content;

    public MPrescription() {
    }

    public MPrescription(String name, String content) {
        this.name = name;
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "MPrescription{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", content=" + content +
                '}';
    }
}
