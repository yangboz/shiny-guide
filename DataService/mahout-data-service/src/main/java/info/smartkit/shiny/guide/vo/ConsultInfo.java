package info.smartkit.shiny.guide.vo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by smartkit on 27/02/2017.
 */
@Entity
public class ConsultInfo  implements Serializable {
    private
    static final long serialVersionUID = -8473186697076849607L;

    @Override
    public String toString() {
        return "ConsultInfo{" +
                "id=" + id +
                ", iid=" + iid +
                ", pid=" + pid +
                '}';
    }

    public ConsultInfo() {
    }

    public ConsultInfo(long iid, long pid) {

        this.iid = iid;
        this.pid = pid;
    }

    public long getId() {
        return id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public long getIid() {
        return iid;
    }

    public void setIid(long iid) {
        this.iid = iid;
    }

    public long getPid() {
        return pid;
    }

    public void setPid(long pid) {
        this.pid = pid;
    }

    private long iid;//Expert's instruction.

    private long pid;//Medical prescription.
}
