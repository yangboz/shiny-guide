package info.smartkit.shiny.guide.vo;


import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Entity;
import java.io.Serializable;

/**
 * Created by smartkit on 20/02/2017.
 */
@Entity
public class UserInfo implements Serializable {

    private static final long serialVersionUID = -8473185797276849607L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    private String name;
    private int gender=1;//1:man,0:women
    private int age;

    private String timage;//tongue image URL;
    private String tcsv;//tongue data(*.csv);

    public UserInfo(String name, int gender, int age, String timage, String tcsv) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.timage = timage;
        this.tcsv = tcsv;
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

    public UserInfo() {
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", gender=" + gender +
                ", age=" + age +
                ", timage='" + timage + '\'' +
                ", tcsv='" + tcsv + '\'' +
                '}';
    }
}
