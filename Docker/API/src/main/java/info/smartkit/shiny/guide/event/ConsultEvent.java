package info.smartkit.shiny.guide.event;

/**
 * Created by smartkit on 02/07/2017.
 */
public class ConsultEvent implements Event{
        public int getId() {
                return id;
        }

        public void setId(int id) {
                this.id = id;
        }

        private int id;

        @Override public String toString() {
                return "ConsultEvent{" + "id=" + id + ", taise='" + taise + '\'' + ", shese='" + shese + '\'' + ", runzao='" + runzao + '\'' + ", houbao='" + houbao + '\'' + ", chihen='" + chihen + '\'' + ", yuban='" + yuban + '\'' + ", liewen='" + liewen
                        + '\'' + ", pangshou='" + pangshou + '}';
        }

        private String taise;

        public String getShese() {
                return shese;
        }

        public void setShese(String shese) {
                this.shese = shese;
        }

        public String getRunzao() {
                return runzao;
        }

        public void setRunzao(String runzao) {
                this.runzao = runzao;
        }

        public String getChihen() {
                return chihen;
        }

        public void setChihen(String chihen) {
                this.chihen = chihen;
        }

        public String getYuban() {
                return yuban;
        }

        public void setYuban(String yuban) {
                this.yuban = yuban;
        }

        public String getLiewen() {
                return liewen;
        }

        public void setLiewen(String liewen) {
                this.liewen = liewen;
        }

        public String getPangshou() {
                return pangshou;
        }

        public void setPangshou(String pangshou) {
                this.pangshou = pangshou;
        }

        private String shese;
        private String runzao;
        private String houbao;
        private String chihen;
        private String yuban;
        private String liewen;
        private String pangshou;

        public String getTaise() {
                return taise;
        }

        public void setTaise(String taise) {
                this.taise = taise;
        }

        public String getHoubao() {
                return houbao;
        }

        public void setHoubao(String houbao) {
                this.houbao = houbao;
        }


}
