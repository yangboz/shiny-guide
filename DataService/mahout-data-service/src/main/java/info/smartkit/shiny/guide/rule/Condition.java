package info.smartkit.shiny.guide.rule;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by smartkit on 02/07/2017.
 */
public class Condition {
        private String field;
        private Object value;
        private Condition.Operator operator;

        public String getField() {
                return field;
        }

        public void setField(String field) {
                this.field = field;
        }

        public Object getValue() {
                return value;
        }

        public void setValue(Object value) {
                this.value = value;
        }

        public Condition.Operator getOperator() {
                return operator;
        }

        public void setOperator(Condition.Operator operator) {
                this.operator = operator;
        }

        public static enum Operator {
                SIMILAR_TO("SIMILAR_TO"),
                NOT_EQUAL_TO("NOT_EQUAL_TO"),
                EQUAL_TO("EQUAL_TO"),
                GREATER_THAN("GREATER_THAN"),
                LESS_THAN("LESS_THAN"),
                GREATER_THAN_OR_EQUAL_TO("GREATER_THAN_OR_EQUAL_TO"),
                LESS_THAN_OR_EQUAL_TO("LESS_THAN_OR_EQUAL_TO");
                private final String value;
                private static Map<String, Operator> constants = new HashMap<String, Operator>();

                static {
                        for (Condition.Operator c : values()) {
                                constants.put(c.value, c);
                        }
                }

                private Operator(String value) {
                        this.value = value;
                }

                @Override
                public String toString() {
                        return this.value;
                }

                public static Condition.Operator fromValue(String value) {
                        Condition.Operator constant = constants.get(value);
                        if (constant == null) {
                                throw new IllegalArgumentException(value);
                        } else {
                                return constant;
                        }
                }
        }
}
