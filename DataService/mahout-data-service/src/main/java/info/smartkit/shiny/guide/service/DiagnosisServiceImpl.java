package info.smartkit.shiny.guide.service;

import info.smartkit.shiny.guide.controllers.DiagnosisController;
import info.smartkit.shiny.guide.dao.ItemDetailDao;
import info.smartkit.shiny.guide.dao.ItemInfoDao;
import info.smartkit.shiny.guide.dto.ConsultDecision;
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
        @Override public void inferByFacts(long uiId) throws Exception {
                // Create an event that will be tested against the rule. In reality, the event would be read from some external store.
                ConsultEvent consultEvent = new ConsultEvent();
                consultEvent.setHoubao("薄|3.74");
                consultEvent.setTaise(null);

                Rule similarVariableValuesFuzzyEqualRule = new Rule();
//
                ItemInfo itemInfo = itemInfoDao.findOne(uiId);
                long idid = itemInfo.getDetailId();
                LOG.info("user_item_detail_id:"+idid);
                ItemDetail itemDetail = itemDetailDao.findOne(idid);
                //
                Condition similarVariableCondition_taise = new Condition();
                similarVariableCondition_taise.setField("taise");
                similarVariableCondition_taise.setOperator(Condition.Operator.EQUAL_TO);
//                similarVariableCondition_taise.setValue("白");
                similarVariableCondition_taise.setValue(itemDetail.getTaise());

                Condition similarVariableCondition_houbao = new Condition();
                similarVariableCondition_houbao.setField("houbao");
                similarVariableCondition_houbao.setOperator(Condition.Operator.EQUAL_TO);
//                similarVariableCondition_houbao.setValue("厚");
                similarVariableCondition_houbao.setValue(itemDetail.getHoubao());

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

        }
}
