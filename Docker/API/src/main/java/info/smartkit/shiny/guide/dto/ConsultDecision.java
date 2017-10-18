package info.smartkit.shiny.guide.dto;

/**
 * Created by smartkit on 02/07/2017.
 */
public class ConsultDecision {
        private Boolean doAlert;

        public ConsultDecision() {
                this.doAlert = false;
        }

        public Boolean getDoAlert() {
                return doAlert;
        }

        public void setDoAlert(Boolean doAlert) {
                this.doAlert = doAlert;
        }
}
