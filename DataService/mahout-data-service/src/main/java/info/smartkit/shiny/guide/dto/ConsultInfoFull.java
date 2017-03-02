package info.smartkit.shiny.guide.dto;

import info.smartkit.shiny.guide.vo.EInstruction;
import info.smartkit.shiny.guide.vo.MPrescription;

/**
 * Created by smartkit on 02/03/2017.
 */
public class ConsultInfoFull {
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public EInstruction geteInstruction() {
        return eInstruction;
    }

    @Override
    public String toString() {
        return "ConsultInfoFull{" +
                "id=" + id +
                ", eInstruction=" + eInstruction +
                ", mPrescription=" + mPrescription +
                '}';
    }

    public ConsultInfoFull() {
    }

    public ConsultInfoFull(EInstruction eInstruction, MPrescription mPrescription) {
        this.eInstruction = eInstruction;
        this.mPrescription = mPrescription;
    }

    public ConsultInfoFull(long id, EInstruction eInstruction, MPrescription mPrescription) {
        this.id = id;
        this.eInstruction = eInstruction;
        this.mPrescription = mPrescription;
    }

    public void seteInstruction(EInstruction eInstruction) {
        this.eInstruction = eInstruction;
    }

    public MPrescription getmPrescription() {
        return mPrescription;
    }

    public void setmPrescription(MPrescription mPrescription) {
        this.mPrescription = mPrescription;
    }

    private long id;
    private EInstruction eInstruction;
    private MPrescription mPrescription;
}
