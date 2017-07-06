package info.smartkit.shiny.guide.utils;

import org.apache.commons.imaging.color.ColorCieLab;
import org.apache.commons.imaging.color.ColorHsv;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.awt.*;

/**
 * Created by smartkit on 02/07/2017.
 * @see: https://stackoverflow.com/questions/9018016/how-to-compare-two-colors-for-similarity-difference
 */
public class ColorUtil {

        private static Logger LOG = LogManager.getLogger(ColorUtil.class);

        public static Color getColorRgb(String r,String g,String b){
                int rInt = (int) Double.parseDouble(r);
                int gInt = (int) Double.parseDouble(g);
                int bInt = (int) Double.parseDouble(b);
                return new Color(rInt,gInt,bInt);
        }
        //
        public static ColorHsv getColorHsv(String h,String s,String v){
                double hDou =  Double.parseDouble(h);
                double sDou = Double.parseDouble(s);
                double vDou =  Double.parseDouble(v);
                return new ColorHsv(hDou,sDou,vDou);
        }
        /*
        *F.E.
        *
        *       Point1 has R1 G1 B1
        *       Point2 has R2 G2 B2
        *Distance between colors is
        *
        *       d=sqrt((r2-r1)^2+(g2-g1)^2+(b2-b1)^2)
        *Percentage is 1-differ
        *
        *       p=d/sqrt((255)^2+(255)^2+(255)^2)
        */
        public static double similarity(Color c1,Color c2){
                LOG.info("C1,"+c1.toString()+",C2:"+c2.toString());
                //
                int r2_r1 = Math.abs(c2.getRed()-c1.getRed());
                int g2_g1 = Math.abs(c2.getGreen()-c1.getGreen());
                int b2_b1 = Math.abs(c2.getBlue()-c1.getBlue());

                double distance = Math.sqrt(Math.pow(r2_r1,2)+Math.pow(g2_g1,2)+Math.pow(b2_b1,2));
                double avgRgb  = Math.sqrt(Math.pow(255,2)+Math.pow(255,2)+Math.pow(255,2));
                double differ = distance/avgRgb;
                LOG.info("differ,"+differ+"distance:"+distance+",avgRgb:"+avgRgb);
                return 1.00-differ;
        }

        /*
         * F.E.
         *      avghue = (color1.hue + color2.hue)/2
         * Distance between colors is
         *      distance = abs(color1.hue-avghue)
         * Percentage is 1-differ
         *
         */
        public static double similarity(ColorHsv c1,ColorHsv c2){
                LOG.info("Ch1,"+c1.toString()+",Ch2:"+c2.toString());
                //
                double avgHue = (c1.H + c2.H)/2;
                double distance = Math.abs(c1.H-avgHue);
                double differ = distance/avgHue;
                LOG.info("differ:"+differ+"distance:"+distance+",avgHue:"+avgHue);
                return 1.00-differ;
        }
}
