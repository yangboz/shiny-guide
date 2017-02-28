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
//    Tongue Body 舌质
//    Pink 淡红舌
//    Slightly red 红舌
//    Red 绛舌
//    Purple 紫舌
//    Pale or white 淡白舌
//
//    Tongue's coating  舌苔
//    No coating 无苔
//    White 白苔
//    Dirty white 白腻苔
//    Slightly yellow 淡黄苔
//    Yellow 黄苔
//    Brown or black 灰黑苔
//    Thick 厚苔
//    Thin 薄苔
//    Geographic 地图舌
//
//    Cracks 裂纹
//    Teethmarks 齿痕
//    Spots and dots 点刺
//    Veins 舌下络脉（这个我们没有采用）
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
