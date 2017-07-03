package info.smartkit.shiny.guide.utils;

import info.smartkit.shiny.guide.vo.ItemDetail;

/**
 * Created by smartkit on 03/07/2017.
 */
public class FuzzyStringUtil {

        static public String getPangshouF(String pangshou){
                String fuzzyStr = ItemDetail.Epangshou.PANG.value;

                if(pangshou.contains(ItemDetail.Epangshou.SHOU.value)){
                        fuzzyStr = ItemDetail.Epangshou.SHOU.value;
                }
                if(pangshou.contains(ItemDetail.Epangshou.SHIZHONG.value)){
                        fuzzyStr = ItemDetail.Epangshou.SHIZHONG.value;
                }
                return fuzzyStr;
        }
        static public String getChihenF(String chihen){
                String fuzzyStr = chihen.contains(ItemDetail.Echihen.YES.value)? ItemDetail.Echihen.YES.value: ItemDetail.Echihen.NO.value;
                return fuzzyStr;
        }
        static public String getLiewenF(String liewen){
                String fuzzyStr = liewen.contains(ItemDetail.Eliewen.YES.value)? ItemDetail.Eliewen.YES.value: ItemDetail.Eliewen.NO.value;
                return fuzzyStr;
        }
        static public String getYubanF(String yuban){
                String fuzzyStr = yuban.contains(ItemDetail.Eyuban.YES.value)? ItemDetail.Eyuban.YES.value: ItemDetail.Eyuban.NO.value;
                return fuzzyStr;
        }

        static public String getHoubaoF(String houbao){
                String fuzzyStr = houbao.contains(ItemDetail.Ehoubao.HOU.value)? ItemDetail.Ehoubao.HOU.value: ItemDetail.Ehoubao.BAO.value;
                return fuzzyStr;
        }

        static public String getRunzaoF(String runzao){
                String fuzzyStr = ItemDetail.Erunzao.RUN.value;

                if(runzao.contains(ItemDetail.Erunzao.ZAO.value)){
                        fuzzyStr = ItemDetail.Erunzao.ZAO.value;
                }
                if(runzao.contains(ItemDetail.Erunzao.ZHONG.value)){
                        fuzzyStr = ItemDetail.Erunzao.ZHONG.value;
                }
                return fuzzyStr;
        }

        static public String getSheseF(String shese){
                String fuzzyStr = ItemDetail.Eshese.HONG.value;

                if(shese.contains(ItemDetail.Eshese.DANHONG.value)){
                        fuzzyStr = ItemDetail.Eshese.DANHONG.value;
                }
                if(shese.contains(ItemDetail.Eshese.DANZI.value)){
                        fuzzyStr = ItemDetail.Eshese.DANZI.value;
                }
                if(shese.contains(ItemDetail.Eshese.ANHONG.value)){
                        fuzzyStr = ItemDetail.Eshese.ANHONG.value;
                }
                if(shese.contains(ItemDetail.Eshese.JIANG.value)){
                        fuzzyStr = ItemDetail.Eshese.JIANG.value;
                }
                if(shese.contains(ItemDetail.Eshese.ZI.value)){
                        fuzzyStr = ItemDetail.Eshese.ZI.value;
                }
                if(shese.contains(ItemDetail.Eshese.DAN.value)){
                        fuzzyStr = ItemDetail.Eshese.DAN.value;
                }
                return fuzzyStr;
        }

        static public String getTaiseF(String taise){
                String fuzzyStr = ItemDetail.Etaise.BAI.value;
                if (taise==null) {
                        taise = "";
                }
                if(taise.contains(ItemDetail.Etaise.HUANGBAI.value)){
                        fuzzyStr = ItemDetail.Etaise.HUANGBAI.value;
                }
                if(taise.contains(ItemDetail.Etaise.HUIHEI.value)){
                        fuzzyStr = ItemDetail.Etaise.HUANGBAI.value;
                }

                if(taise.contains(ItemDetail.Etaise.HUANG.value)){
                        fuzzyStr = ItemDetail.Etaise.HUANG.value;
                }
                return fuzzyStr;
        }

}
