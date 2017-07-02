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

        private String taise;

        @Override public String toString() {
                return "ConsultEvent{" + "id=" + id + ", taise='" + taise + '\'' + ", houbao='" + houbao + '\'' + ", confidence=" + confidence + '}';
        }

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

        private String houbao;

        public double getConfidence() {
                return confidence;
        }

        public void setConfidence(double confidence) {
                this.confidence = confidence;
        }

        private double confidence;

}
