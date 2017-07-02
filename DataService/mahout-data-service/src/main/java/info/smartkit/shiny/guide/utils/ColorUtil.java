package info.smartkit.shiny.guide.utils;

import org.apache.commons.imaging.color.ColorHsv;

import java.awt.*;

/**
 * Created by smartkit on 02/07/2017.
 * @see: https://stackoverflow.com/questions/9018016/how-to-compare-two-colors-for-similarity-difference
 */
public class ColorUtil {

        /*
        *F.E.
        *
        *       Point1 has R1 G1 B1
        *       Point2 has R2 G2 B2
        *Distance between colors is
        *
        *       d=sqrt((r2-r1)^2+(g2-g1)^2+(b2-b1)^2)
        *Percentage is
        *
        *       p=d/sqrt((255)^2+(255)^2+(255)^2)
        */
        public static double similarity(Color c1,Color c2){
                //
                int r2_r1 = c2.getRed()-c1.getRed();
                int g2_g1 = c2.getGreen()-c1.getGreen();
                int b2_b1 = c2.getBlue()-c1.getBlue();

                double distance = Math.sqrt(Math.pow(r2_r1,2)+Math.pow(g2_g1,2)+Math.pow(b2_b1,2));
                double avgRgb  = Math.sqrt(Math.pow(255,2)+Math.pow(255,2)+Math.pow(255,2));

                return distance/avgRgb;
        }

        /*
         * F.E.
         *      avghue = (color1.hue + color2.hue)/2
         * Distance between colors is
         *      distance = abs(color1.hue-avghue)
         * Percentage is?
         *
         */
        public static double similarity(ColorHsv c1,ColorHsv c2){
                //
                double avgHue = (c1.H + c2.H)/2;
                double distance = Math.abs(c1.H-avgHue);
                return distance/avgHue;
        }
}
