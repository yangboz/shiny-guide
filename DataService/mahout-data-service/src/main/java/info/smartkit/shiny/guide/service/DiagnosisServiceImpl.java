package info.smartkit.shiny.guide.service;

import info.smartkit.shiny.guide.dao.ConsultInfoDao;
import info.smartkit.shiny.guide.dao.ItemDetailDao;
import info.smartkit.shiny.guide.dao.ItemInfoDao;
import info.smartkit.shiny.guide.dao.UserInfoDao;
import info.smartkit.shiny.guide.dto.ConsultDecision;
import info.smartkit.shiny.guide.utils.ColorUtil;
import info.smartkit.shiny.guide.utils.FuzzyStringUtil;
import info.smartkit.shiny.guide.vo.*;
import info.smartkit.shiny.guide.event.ConsultEvent;
import info.smartkit.shiny.guide.rule.Condition;
import info.smartkit.shiny.guide.rule.Rule;
import info.smartkit.shiny.guide.utils.DroolsUtil;
import org.apache.commons.imaging.color.ColorCieLab;
import org.apache.commons.imaging.color.ColorHsv;
import org.apache.commons.lang.ArrayUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.awt.*;
import java.util.*;
import java.util.List;

/**
 * Created by smartkit on 02/07/2017.
 */
@Service
public class DiagnosisServiceImpl implements DiagnosisService {
        @Autowired ItemInfoDao itemInfoDao;
        @Autowired ItemDetailDao itemDetailDao;
        @Autowired ConsultInfoDao consultInfoDao;
        @Autowired ConsultInfoService consultInfoService;
        @Autowired UserInfoDao userInfoDao;
        @PersistenceContext
        private EntityManager em;

        private static Logger LOG = LogManager.getLogger(DiagnosisServiceImpl.class);

//        @Query("select user_info.id,name,age, item_info.id, consult_info.id, mprescription.id, einstruction.id "
//                + "from user_info left join item_info on user_info.item_id = item_info.id "
//                + "left join item_detail on item_info.detail_id = item_detail.id "
//                + "left join consult_info on user_info.consult_id = consult_info.id "
//                + "left join mprescription on consult_info.pid = mprescription.id "
//                + "left join einstruction on consult_info.iid = einstruction.id "
//                + "where user_info.consult_id <> -1")
        @Override public List<UserItemConsultInfoIdDetails> findUserItemConsultInfoDetail(){
                String nativeQuery = "select user_info.id, item_info.id as iid, "
                        + "item_detail.id as idid, item_detail.yuban as yuban,item_detail.shese as shese,item_detail.runzao as runzao,item_detail.pangshou as pangshou,"
                        + "item_detail.houbao as houbao,item_detail.liewen as liewen,item_detail.taise as taise,item_detail.chihen as chihen,"
                        + "item_detail.rgbR as rgbR,item_detail.rgbG as rgbG,item_detail.rgbB as rgbB,"
                        + "item_detail.hsvH as hsvH,item_detail.hsvS as hsvS,item_detail.hsvV as hsvV,"
                        + "item_detail.labL as labL,item_detail.labA as labA,item_detail.labB as labB,"
                        + "consult_info.id as cid, mprescription.id as mpid, einstruction.id as eiid "
                        + "from user_info left join item_info on user_info.item_id = item_info.id "
                        + "left join item_detail on item_info.detail_id = item_detail.id "
                        + "left join consult_info on user_info.consult_id = consult_info.id "
                        + "left join mprescription on consult_info.pid = mprescription.id "
                        + "left join einstruction on consult_info.iid = einstruction.id "
                        + "where user_info.consult_id <> -1";
                //
                List<UserItemConsultInfoIdDetails>  userItemConsultInfoDetailIds =  this.em.createNativeQuery(nativeQuery,UserItemConsultInfoIdDetails.class).getResultList();
                LOG.info("userItemConsultInfoDetails:"+userItemConsultInfoDetailIds);
                return userItemConsultInfoDetailIds;
        }

        //
        @Override public List<ConsultEinstrMpers> inferByFacts(long uiId,int order) throws Exception {
                List<ConsultEinstrMpers> consultEinstrMpersz = new ArrayList<ConsultEinstrMpers>();
                long inferedConsultId;
                //inference item
                ItemInfo itemInfo = itemInfoDao.findOne(uiId);
                long idid = itemInfo.getDetailId();
                LOG.info("user_item_detail_id:" + idid);
                ItemDetail itemDetail = itemDetailDao.findOne(idid);
                //FOR LOOP by facts/memory works:
                List<UserItemConsultInfoIdDetails> userItemConsultInfoDetails = findUserItemConsultInfoDetail();
                if(order>0)//currently,reverse
                {
                        Collections.reverse(userItemConsultInfoDetails);
                }
                for(UserItemConsultInfoIdDetails userItemConsultInfoIdDetails : userItemConsultInfoDetails) {
                        // Create an event that will be tested against the rule. In reality, the event would be read from some external store.
                        ConsultEvent consultEvent = new ConsultEvent();
                        //
                        String houbaoF = FuzzyStringUtil.getHoubaoF(userItemConsultInfoIdDetails.getHoubao());
                        consultEvent.setHoubao(houbaoF);
                        //
                        String taiseF = FuzzyStringUtil.getTaiseF(userItemConsultInfoIdDetails.getTaise());
                        consultEvent.setTaise(taiseF);
                        //
                        String chihenF = FuzzyStringUtil.getChihenF(userItemConsultInfoIdDetails.getChihen());
                        consultEvent.setChihen(chihenF);
                        //
                        String liewenF = FuzzyStringUtil.getLiewenF(userItemConsultInfoIdDetails.getLiewen());
                        consultEvent.setLiewen(liewenF);
                        //
                        String pangshouF = FuzzyStringUtil.getPangshouF(userItemConsultInfoIdDetails.getPangshou());
                        consultEvent.setPangshou(pangshouF);
                        //
                        String runzaoF = FuzzyStringUtil.getRunzaoF(userItemConsultInfoIdDetails.getRunzao());
                        consultEvent.setRunzao(runzaoF);
                        //
                        String sheseF = FuzzyStringUtil.getSheseF(userItemConsultInfoIdDetails.getShese());
                        consultEvent.setShese(sheseF);
                        //
                        String yubanF = FuzzyStringUtil.getYubanF(userItemConsultInfoIdDetails.getYuban());
                        consultEvent.setYuban(yubanF);
                        //Rule
                        Rule similarVariableValuesFuzzyEqualRule = new Rule();
                        //Conditions
                        //RGB operator
                                        Condition similarVariableCondition_rgb = new Condition();
                                        similarVariableCondition_rgb.setField("rgb");
//                                        similarVariableCondition_rgb.setOperator(Condition.Operator.C_SIMILAR_TO);
                                        similarVariableCondition_rgb.setValue(itemDetail.getRgb());
                        //HSV
                                        Condition similarVariableCondition_hsv = new Condition();
                                        similarVariableCondition_hsv.setField("hsv");
//                                        similarVariableCondition_hsv.setOperator(Condition.Operator.C_SIMILAR_TO);
                                        similarVariableCondition_hsv.setValue(itemDetail.getHsv());
                        //Lab
                                        Condition similarVariableCondition_lbl = new Condition();
                                        similarVariableCondition_lbl.setField("lab");
//                                        similarVariableCondition_lbl.setOperator(Condition.Operator.C_SIMILAR_TO);
                                        similarVariableCondition_lbl.setValue(itemDetail.getLab());
                        //shese
                        Condition similarVariableCondition_shese = new Condition();
                        similarVariableCondition_shese.setField("shese");
                        similarVariableCondition_shese.setOperator(Condition.Operator.S_SIMILAR_TO);
                        similarVariableCondition_shese.setValue(itemDetail.getSheseF());
                        //taise
                        Condition similarVariableCondition_taise = new Condition();
                        similarVariableCondition_taise.setField("taise");
                        similarVariableCondition_taise.setOperator(Condition.Operator.S_SIMILAR_TO);
                        similarVariableCondition_taise.setValue(itemDetail.getTaiseF());
                        //houbao
                        Condition similarVariableCondition_houbao = new Condition();
                        similarVariableCondition_houbao.setField("houbao");
                        similarVariableCondition_houbao.setOperator(Condition.Operator.S_SIMILAR_TO);
                        similarVariableCondition_houbao.setValue(itemDetail.getHoubaoF());
                        //runzao
                        Condition similarVariableCondition_runzao = new Condition();
                        similarVariableCondition_runzao.setField("runzao");
                        similarVariableCondition_runzao.setOperator(Condition.Operator.S_SIMILAR_TO);
                        similarVariableCondition_runzao.setValue(itemDetail.getRunzaoF());
                        //pangshou
                        Condition similarVariableCondition_pangshou = new Condition();
                        similarVariableCondition_pangshou.setField("pangshou");
                        similarVariableCondition_pangshou.setOperator(Condition.Operator.S_SIMILAR_TO);
                        similarVariableCondition_pangshou.setValue(itemDetail.getPangshouF());
                        //chihen
                        Condition similarVariableCondition_chihen = new Condition();
                        similarVariableCondition_chihen.setField("chihen");
                        similarVariableCondition_chihen.setOperator(Condition.Operator.S_SIMILAR_TO);
                        similarVariableCondition_chihen.setValue(itemDetail.getChihenF());
                        //liewen
                        Condition similarVariableCondition_liewen = new Condition();
                        similarVariableCondition_liewen.setField("liewen");
                        similarVariableCondition_liewen.setOperator(Condition.Operator.S_SIMILAR_TO);
                        similarVariableCondition_liewen.setValue(itemDetail.getLiewenF());
                        //yuban
                        Condition similarVariableCondition_yuban = new Condition();
                        similarVariableCondition_yuban.setField("yuban");
                        similarVariableCondition_yuban.setOperator(Condition.Operator.S_SIMILAR_TO);
                        similarVariableCondition_yuban.setValue(itemDetail.getYubanF());

                        // In reality, you would have multiple rules for different types of events.
                        // The eventType property would be used to find rules relevant to the event
                        similarVariableValuesFuzzyEqualRule.setEventType(Rule.eventType.ORDER);

                        similarVariableValuesFuzzyEqualRule.setConditions(
                                Arrays.asList(similarVariableCondition_taise, similarVariableCondition_houbao, similarVariableCondition_chihen, similarVariableCondition_liewen, similarVariableCondition_pangshou, similarVariableCondition_runzao,
                                        similarVariableCondition_shese, similarVariableCondition_yuban));

                        String drl = DroolsUtil.applyRuleTemplate(consultEvent, similarVariableValuesFuzzyEqualRule);
                        ConsultDecision consultDecision = DroolsUtil.evaluate(drl, consultEvent);
                        //
                        ConsultEinstrMpers consultEinstrMpers = null;
                        if(consultDecision.getDoAlert()) {
                                inferedConsultId = userItemConsultInfoIdDetails.getCid();
                                LOG.info("inference by facts, and consult decision result,id:" +inferedConsultId);
                                consultEinstrMpers = consultInfoService.findConsultEinstrMpers(inferedConsultId);
                                //use ColorSimilarity as operator.
                                Color colorRgb = ColorUtil.getColorRgb(userItemConsultInfoIdDetails.getRgbR(),userItemConsultInfoIdDetails.getRgbG(),userItemConsultInfoIdDetails.getRgbB());
                                ColorHsv colorHsv = ColorUtil.getColorHsv(userItemConsultInfoIdDetails.getHsvH(),userItemConsultInfoIdDetails.getHsvS(),userItemConsultInfoIdDetails.getHsvV());
                                ColorCieLab colorLab = ColorUtil.getColorLab(userItemConsultInfoIdDetails.getLabL(),userItemConsultInfoIdDetails.getLabA(),userItemConsultInfoIdDetails.getLabB());
                                double rgbS = ColorUtil.similarity(colorRgb,itemDetail.getRgb());
                                double hsvS = ColorUtil.similarity(colorHsv,itemDetail.getHsv());
                                double labS = ColorUtil.similarity(colorLab,itemDetail.getLab());
                                LOG.info("rgbS:"+rgbS+",hsvS:"+hsvS+",labS:"+labS);
                                consultEinstrMpers.setRgbS(rgbS);
                                consultEinstrMpers.setHsvS(hsvS);
                                consultEinstrMpers.setLabS(labS);
                                //find target users info by cid
                                List<UserInfo> targetUsers = userInfoDao.findByConsultId(inferedConsultId);
                                consultEinstrMpers.getTargets().addAll(targetUsers);
                                LOG.info("inference by facts, and consult decision result,detail:" +consultEinstrMpers.toString());
//                                break;
                                consultEinstrMpersz.add(consultEinstrMpers);
                        }
                }
                //order array list by similarity.
                Collections.sort(consultEinstrMpersz, new Comparator<ConsultEinstrMpers>() {
                        @Override public int compare(ConsultEinstrMpers o1, ConsultEinstrMpers o2) {
                                return Double.valueOf(o2.getRgbS()).compareTo(o1.getRgbS());
                        }
                });
                //
                LOG.info("inference by facts, and list of consultEinstrMpers:" +consultEinstrMpersz.toString());
                if(consultEinstrMpersz.size()==0){
                        //TODO:mahout recommend by similarity calculation.
                         LOG.warn("TODO:mahout recommend by similarity calculation.");
                }
//
                return consultEinstrMpersz;
        }
}
