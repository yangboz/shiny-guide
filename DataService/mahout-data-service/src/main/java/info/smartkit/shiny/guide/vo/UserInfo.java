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
    private String name;
    private int gender = 1;//1:man,0:women
    private int age;
    private long itemId = -1;
    public UserInfo(String name, int gender, int age, long itemId) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.itemId = itemId;
    }

    public UserInfo() {
    }

    public long getId() {
        return id;
    }

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

    @Override
    public String toString() {
        return "UserInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", gender=" + gender +
                ", age=" + age +
                ", itemId=" + itemId +
                '}';
    }

}
