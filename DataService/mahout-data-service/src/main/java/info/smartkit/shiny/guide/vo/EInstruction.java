package info.smartkit.shiny.guide.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by yangboz on 23/02/2017.
 * Expert's instruction.
 */
@Entity
public class EInstruction implements Serializable {

    private
    static final long serialVersionUID = -8473186697276849607L;

    public long getId() {
        return id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String content;

    public EInstruction() {
    }

    public EInstruction(String name, String content) {
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
        return "EInstruction{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", content=" + content +
                '}';
    }
}
