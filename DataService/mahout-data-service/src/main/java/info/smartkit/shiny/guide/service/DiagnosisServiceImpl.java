package info.smartkit.shiny.guide.service;

import info.smartkit.shiny.guide.controllers.DiagnosisController;
import info.smartkit.shiny.guide.dao.ItemDetailDao;
import info.smartkit.shiny.guide.dao.ItemInfoDao;
import info.smartkit.shiny.guide.dto.ConsultDecision;
import info.smartkit.shiny.guide.dto.ConsultInfoFull;
import info.smartkit.shiny.guide.event.ConsultEvent;
import info.smartkit.shiny.guide.rule.Condition;
import info.smartkit.shiny.guide.rule.Rule;
import info.smartkit.shiny.guide.utils.DroolsUtil;
import info.smartkit.shiny.guide.vo.ItemDetail;
import info.smartkit.shiny.guide.vo.ItemInfo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * Created by smartkit on 02/07/2017.
 */
@Service
public class DiagnosisServiceImpl implements DiagnosisService {
        @Autowired ItemInfoDao itemInfoDao;
        @Autowired ItemDetailDao itemDetailDao;

        private static Logger LOG = LogManager.getLogger(DiagnosisServiceImpl.class);

        //
        @Override public ConsultInfoFull inferByFacts(long uiId) throws Exception {
                ConsultInfoFull consultInfoFull = new ConsultInfoFull();
                // Create an event that will be tested against the rule. In reality, the event would be read from some external store.
                ConsultEvent consultEvent = new ConsultEvent();
                consultEvent.setHoubao("薄|3.74");
                consultEvent.setTaise(null);
                //Rule
                Rule similarVariableValuesFuzzyEqualRule = new Rule();
//
                ItemInfo itemInfo = itemInfoDao.findOne(uiId);
                long idid = itemInfo.getDetailId();
                LOG.info("user_item_detail_id:"+idid);
                ItemDetail itemDetail = itemDetailDao.findOne(idid);
                //Conditions
                //RGB
                Condition similarVariableCondition_rgb = new Condition();
                similarVariableCondition_rgb.setField("rgb");
                similarVariableCondition_rgb.setOperator(Condition.Operator.C_SIMILAR_TO);
                similarVariableCondition_rgb.setValue(itemDetail.getRgb());
                //HSV
                Condition similarVariableCondition_hsv = new Condition();
                similarVariableCondition_hsv.setField("hsv");
                similarVariableCondition_hsv.setOperator(Condition.Operator.C_SIMILAR_TO);
                similarVariableCondition_hsv.setValue(itemDetail.getHsv());
                //Label,what is meaningful?
//                Condition similarVariableCondition_lbl = new Condition();
//                similarVariableCondition_lbl.setField("lable");
//                similarVariableCondition_lbl.setOperator(Condition.Operator.EQUAL_TO);
//                similarVariableCondition_lbl.setValue(itemDetail.getLabelA());
                //shese
                Condition similarVariableCondition_shese = new Condition();
                similarVariableCondition_shese.setField("shese");
                similarVariableCondition_shese.setOperator(Condition.Operator.S_SIMILAR_TO);
                similarVariableCondition_shese.setValue(itemDetail.getShese());
                //taise
                Condition similarVariableCondition_taise = new Condition();
                similarVariableCondition_taise.setField("taise");
                similarVariableCondition_taise.setOperator(Condition.Operator.S_SIMILAR_TO);
                similarVariableCondition_taise.setValue(itemDetail.getTaise());
                //houbao
                Condition similarVariableCondition_houbao = new Condition();
                similarVariableCondition_houbao.setField("houbao");
                similarVariableCondition_houbao.setOperator(Condition.Operator.S_SIMILAR_TO);
                similarVariableCondition_houbao.setValue(itemDetail.getHoubao());
                //runzao
                Condition similarVariableCondition_runzao = new Condition();
                similarVariableCondition_runzao.setField("runzao");
                similarVariableCondition_runzao.setOperator(Condition.Operator.S_SIMILAR_TO);
                similarVariableCondition_runzao.setValue(itemDetail.getRunzao());
                //pangshou
                Condition similarVariableCondition_pangshou = new Condition();
                similarVariableCondition_pangshou.setField("pangshou");
                similarVariableCondition_pangshou.setOperator(Condition.Operator.S_SIMILAR_TO);
                similarVariableCondition_pangshou.setValue(itemDetail.getPangshou());
                //chihen
                Condition similarVariableCondition_chihen = new Condition();
                similarVariableCondition_chihen.setField("chihen");
                similarVariableCondition_chihen.setOperator(Condition.Operator.S_SIMILAR_TO);
                similarVariableCondition_chihen.setValue(itemDetail.getChihen());
                //liewen
                Condition similarVariableCondition_liewen = new Condition();
                similarVariableCondition_liewen.setField("liewen");
                similarVariableCondition_liewen.setOperator(Condition.Operator.S_SIMILAR_TO);
                similarVariableCondition_liewen.setValue(itemDetail.getLiewen());
                //yuban
                Condition similarVariableCondition_yuban = new Condition();
                similarVariableCondition_yuban.setField("yuban");
                similarVariableCondition_yuban.setOperator(Condition.Operator.S_SIMILAR_TO);
                similarVariableCondition_yuban.setValue(itemDetail.getYuban());

                // In reality, you would have multiple rules for different types of events.
                // The eventType property would be used to find rules relevant to the event
                similarVariableValuesFuzzyEqualRule.setEventType(Rule.eventType.ORDER);

                similarVariableValuesFuzzyEqualRule.setConditions(Arrays.asList(similarVariableCondition_taise, similarVariableCondition_houbao));

                String drl = DroolsUtil.applyRuleTemplate(consultEvent, similarVariableValuesFuzzyEqualRule);
                ConsultDecision consultDecision = DroolsUtil.evaluate(drl, consultEvent);
                //
                LOG.info("consultDecision:"+consultDecision.getDoAlert());
//                System.out.println("consultDecision,iid:"+consultDecision.getIid());
//                System.out.println("consultDecision,pid:"+consultDecision.getPid());

//                // doAlert is false by default
//                if (consultDecision.getDoAlert()) {
//                        // do notification
//                }
                return consultInfoFull;
        }
}
