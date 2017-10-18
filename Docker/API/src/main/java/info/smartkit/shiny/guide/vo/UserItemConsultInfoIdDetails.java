package info.smartkit.shiny.guide.vo;

import org.apache.commons.imaging.color.ColorHsv;
import org.springframework.data.annotation.Transient;

import javax.persistence.*;
import java.awt.*;

/**
 * Created by smartkit on 03/07/2017.
 */
@Entity
public class UserItemConsultInfoIdDetails {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;


        public int getIid() {
                return iid;
        }

        public void setIid(int iid) {
                this.iid = iid;
        }

        public int getIdid() {
                return idid;
        }

        public void setIdid(int idid) {
                this.idid = idid;
        }

        public long getCid() {
                return cid;
        }

        public void setCid(long cid) {
                this.cid = cid;
        }

        public int getMpid() {
                return mpid;
        }

        public void setMpid(int mpid) {
                this.mpid = mpid;
        }

        public int getEiid() {
                return eiid;
        }

        public void setEiid(int eiid) {
                this.eiid = eiid;
        }

        private int iid;
        private int idid;
        private long cid;
        private int mpid;
        private int eiid;

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

        public String getPangshou() {
                return pangshou;
        }

        public void setPangshou(String pangshou) {
                this.pangshou = pangshou;
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

        public String getRunzao() {
                return runzao;
        }

        public void setRunzao(String runzao) {
                this.runzao = runzao;
        }

        public String getHoubao() {
                return houbao;
        }

        public void setHoubao(String houbao) {
                this.houbao = houbao;
        }

        //item details.
        private String shese;
        private String taise;
        private String pangshou;

        public String getChihen() {
                return chihen;
        }

        public void setChihen(String chihen) {
                this.chihen = chihen;
        }

        private String chihen;
        private String liewen;
        private String yuban;
        private String runzao;
        private String houbao;

        private String rgbR;
        private String rgbG;
        private String rgbB;
        private String hsvH;
        private String hsvS;

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

        private String hsvV;

        @Override public String toString() {
                return "UserItemConsultInfoIdDetails{" + "id=" + id + ", iid=" + iid + ", idid=" + idid + ", cid=" + cid + ", mpid=" + mpid + ", eiid=" + eiid + ", shese='" + shese + '\'' + ", taise='" + taise + '\'' + ", pangshou='" + pangshou + '\''
                        + ", chihen='" + chihen + '\'' + ", liewen='" + liewen + '\'' + ", yuban='" + yuban + '\'' + ", runzao='" + runzao + '\'' + ", houbao='" + houbao + '\'' + ", rgbR='" + rgbR + '\'' + ", rgbG='" + rgbG + '\'' + ", rgbB='" + rgbB + '\''
                        + ", hsvH='" + hsvH + '\'' + ", hsvS='" + hsvS + '\'' + ", hsvV='" + hsvV + '\'' + ", labL='" + labL + '\'' + ", labA='" + labA + '\'' + ", labB='" + labB + '\'' + '}';
        }

        public String getLabL() {
                return labL;
        }

        public void setLabL(String labL) {
                this.labL = labL;
        }

        public String getLabA() {
                return labA;
        }

        public void setLabA(String labA) {
                this.labA = labA;
        }

        public String getLabB() {
                return labB;
        }

        public void setLabB(String labB) {
                this.labB = labB;
        }

        private String labL;
        private String labA;
        private String labB;

}
