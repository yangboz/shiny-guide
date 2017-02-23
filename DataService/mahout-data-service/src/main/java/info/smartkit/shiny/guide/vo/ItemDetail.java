package info.smartkit.shiny.guide.vo;

import com.blogspot.na5cent.exom.annotation.Column;

import java.util.Date;

/**
 * Created by yangboz on 23/02/2017.
 */
public class ItemDetail {
    @Column(name = "厚薄") //must same excel header (first row)
    private String houbao;
    @Column(name = "腐腻")
    private String funi;
    @Column(name = "润燥")
    private String runzao;
    @Column(name = "剥苔")
    private String botai;
    @Column(name = "胖瘦")
    private String pangshou;
    @Column(name = "齿痕")
    private String chihen;
    @Column(name = "点刺")
    private String dianci;
    @Column(name = "裂纹")
    private String liewen;
    @Column(name = "瘀斑")
    private String yuban;
    @Column(name = "苔质")
    private String taizhi;
    @Column(name = "舌形")
    private String shexing;
    @Column(name = "整体舌色")
    private String shese;
    @Column(name = "整体苔色")
    private String taise;
    @Column(name = "结果")
    private String jieguo;

    @Column(name = "RGB_R")
    private String rgbR;
    @Column(name = "RGB_R")
    private String rgbG;
    @Column(name = "RGB_B")
    private String rgbB;
    @Column(name = "HSV_H")
    private String hsvH;
    @Column(name = "HSV_S")
    private String hsvS;
    @Column(name = "HSV_V")
    private String hsvV;

    public ItemDetail() {

    }

    public ItemDetail(String houbao, String funi, String runzao, String botai, String pangshou, String chihen, String dianci, String liewen, String yuban, String taizhi, String shexing, String shese, String taise, String jieguo, String rgbR, String rgbG, String rgbB, String hsvH, String hsvS, String hsvV) {

        this.houbao = houbao;
        this.funi = funi;
        this.runzao = runzao;
        this.botai = botai;
        this.pangshou = pangshou;
        this.chihen = chihen;
        this.dianci = dianci;
        this.liewen = liewen;
        this.yuban = yuban;
        this.taizhi = taizhi;
        this.shexing = shexing;
        this.shese = shese;
        this.taise = taise;
        this.jieguo = jieguo;
        this.rgbR = rgbR;
        this.rgbG = rgbG;
        this.rgbB = rgbB;
        this.hsvH = hsvH;
        this.hsvS = hsvS;
        this.hsvV = hsvV;
    }

    @Override
    public String toString() {
        return "ItemDetail{" +
                "houbao='" + houbao + '\'' +
                ", funi='" + funi + '\'' +
                ", runzao='" + runzao + '\'' +
                ", botai='" + botai + '\'' +
                ", pangshou='" + pangshou + '\'' +
                ", chihen='" + chihen + '\'' +
                ", dianci='" + dianci + '\'' +
                ", liewen='" + liewen + '\'' +
                ", yuban='" + yuban + '\'' +
                ", taizhi='" + taizhi + '\'' +
                ", shexing='" + shexing + '\'' +
                ", shese='" + shese + '\'' +
                ", taise='" + taise + '\'' +
                ", jieguo='" + jieguo + '\'' +
                ", rgbR='" + rgbR + '\'' +
                ", rgbG='" + rgbG + '\'' +
                ", rgbB='" + rgbB + '\'' +
                ", hsvH='" + hsvH + '\'' +
                ", hsvS='" + hsvS + '\'' +
                ", hsvV='" + hsvV + '\'' +
                '}';
    }

    public String getHoubao() {
        return houbao;
    }

    public void setHoubao(String houbao) {
        this.houbao = houbao;
    }

    public String getFuni() {
        return funi;
    }

    public void setFuni(String funi) {
        this.funi = funi;
    }

    public String getRunzao() {
        return runzao;
    }

    public void setRunzao(String runzao) {
        this.runzao = runzao;
    }

    public String getBotai() {
        return botai;
    }

    public void setBotai(String botai) {
        this.botai = botai;
    }

    public String getPangshou() {
        return pangshou;
    }

    public void setPangshou(String pangshou) {
        this.pangshou = pangshou;
    }

    public String getChihen() {
        return chihen;
    }

    public void setChihen(String chihen) {
        this.chihen = chihen;
    }

    public String getDianci() {
        return dianci;
    }

    public void setDianci(String dianci) {
        this.dianci = dianci;
    }

    public String getLiewen() {
        return liewen;
    }

    public void setLiewen(String liewen) {
        this.liewen = liewen;
    }

    public String getYuban() {
        return yuban;
    }

    public void setYuban(String yuban) {
        this.yuban = yuban;
    }

    public String getTaizhi() {
        return taizhi;
    }

    public void setTaizhi(String taizhi) {
        this.taizhi = taizhi;
    }

    public String getShexing() {
        return shexing;
    }

    public void setShexing(String shexing) {
        this.shexing = shexing;
    }

    public String getShese() {
        return shese;
    }

    public void setShese(String shese) {
        this.shese = shese;
    }

    public String getTaise() {
        return taise;
    }

    public void setTaise(String taise) {
        this.taise = taise;
    }

    public String getJieguo() {
        return jieguo;
    }

    public void setJieguo(String jieguo) {
        this.jieguo = jieguo;
    }

    public String getRgbR() {
        return rgbR;
    }

    public void setRgbR(String rgbR) {
        this.rgbR = rgbR;
    }

    public String getRgbG() {
        return rgbG;
    }

    public void setRgbG(String rgbG) {
        this.rgbG = rgbG;
    }

    public String getRgbB() {
        return rgbB;
    }

    public void setRgbB(String rgbB) {
        this.rgbB = rgbB;
    }

    public String getHsvH() {
        return hsvH;
    }

    public void setHsvH(String hsvH) {
        this.hsvH = hsvH;
    }

    public String getHsvS() {
        return hsvS;
    }

    public void setHsvS(String hsvS) {
        this.hsvS = hsvS;
    }

    public String getHsvV() {
        return hsvV;
    }

    public void setHsvV(String hsvV) {
        this.hsvV = hsvV;
    }
}
