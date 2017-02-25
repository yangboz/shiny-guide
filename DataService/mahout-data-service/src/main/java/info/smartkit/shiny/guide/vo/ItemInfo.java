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
    private String timage;//舌像
    private int detailId = -1;

    public ItemInfo(String name, String timage, int detailId) {
        this.name = name;
        this.timage = timage;
        this.detailId = detailId;
    }

    public ItemInfo() {
    }
    public ItemInfo(String name) {

        this.name = name;
    }

    public String getTimage() {

        return timage;
    }

    public void setTimage(String timage) {
        this.timage = timage;
    }

    public int getDetailId() {
        return detailId;
    }

    public void setDetailId(int detailId) {
        this.detailId = detailId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "ItemInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", timage='" + timage + '\'' +
                ", detailId=" + detailId +
                '}';
    }
}
