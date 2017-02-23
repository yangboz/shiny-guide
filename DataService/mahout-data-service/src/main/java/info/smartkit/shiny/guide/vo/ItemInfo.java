package info.smartkit.shiny.guide.vo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by yangboz on 23/02/2017.
 */
@Entity
public class ItemInfo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;//"齿痕淡红舌薄白苔"

    private String content;

    public ItemInfo() {
    }

    public ItemInfo(String name) {

        this.name = name;
    }

    public ItemInfo(String name, String content) {
        this.name = name;
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "ItemInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", content=" + content +
                '}';
    }
}
