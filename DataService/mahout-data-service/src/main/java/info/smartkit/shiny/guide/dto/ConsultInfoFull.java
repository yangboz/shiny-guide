package info.smartkit.shiny.guide.dto;

import info.smartkit.shiny.guide.vo.EInstruction;
import info.smartkit.shiny.guide.vo.MPrescription;

/**
 * Created by smartkit on 02/03/2017.
 */
public class ConsultInfoFull {
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
