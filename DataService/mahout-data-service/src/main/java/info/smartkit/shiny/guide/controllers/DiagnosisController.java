package info.smartkit.shiny.guide.controllers;

import com.javacodegeeks.drools.model.Customer;
import com.javacodegeeks.drools.model.Product;
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import info.smartkit.shiny.guide.dao.*;
import info.smartkit.shiny.guide.dto.ConsultInfoFull;
import info.smartkit.shiny.guide.settings.DataBaseSettings;
import info.smartkit.shiny.guide.utils.MahoutUtils;
import info.smartkit.shiny.guide.vo.ConsultInfo;
import info.smartkit.shiny.guide.vo.EInstruction;
import info.smartkit.shiny.guide.vo.ItemDetail;
import info.smartkit.shiny.guide.vo.MPrescription;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.model.JDBCDataModel;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.drools.template.jdbc.ResultSetGenerator;
import org.kie.api.io.ResourceType;
import org.kie.internal.KnowledgeBase;
import org.kie.internal.KnowledgeBaseFactory;
import org.kie.internal.builder.DecisionTableConfiguration;
import org.kie.internal.builder.DecisionTableInputType;
import org.kie.internal.builder.KnowledgeBuilder;
import org.kie.internal.builder.KnowledgeBuilderFactory;
import org.kie.internal.io.ResourceFactory;
import org.kie.internal.runtime.StatelessKnowledgeSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

/**
 * Created by smartkit on 01/03/2017.
 */
@RestController
// @see: http://spring.io/guides/gs/reactor-thumbnailer/
@RequestMapping(value = "/diagnosis")
public class DiagnosisController {

    @Autowired
    private UserInfoDao userInfoDao;

    @Autowired
    private MPrescriptionDao mPrescriptionDao;

    @Autowired
    private EInstructionDao eInstructionDao;

    @Autowired
    private ConsultInfoDao consultInfoDao;

    @Autowired
    private ItemDetailDao itemDetailDao;

    private static Logger LOG = LogManager.getLogger(RecommendController.class);

    private static StatelessKnowledgeSession session;

    @RequestMapping(value = "user/{id}", method = RequestMethod.GET)
    @ApiOperation(httpMethod = "GET", value = "Response a consult info fully describing if the user's diagnosis is successfully get or not.")
    public ConsultInfoFull getByUser(@PathVariable("id") long id) throws Exception {
        try{
            long findUserId = userInfoDao.findOne(id).getId();
        }catch (NullPointerException ex){
        }
        /*
        //http://docs.jboss.org/drools/release/6.0.1.Final/drools-docs/html_single/index.html#d0e4969
        With Rule Templates the data is separated from the rule and there are no restrictions on which part of the rule is data-driven.
        So whilst you can do everything you could do in decision tables you can also do the following:
        1.store your data in a database (or any other format)
        2.conditionally generate rules based on the values in the data
        3.use data for any part of your rules (e.g. condition operator, class name, property name)
        4.run different templates over the same data
        */
//maintain rules in a database table, rule templates:
        // Get results from your DB query...
//        resultSet = preparedStmt.executeQuery();
//        // Generate the DRL...
//        ResultSetGenerator resultSetGenerator = new ResultSetGenerator();
//        String drl = resultSetGenerator.compile(resultSet,
//                new FileInputStream("path/to/template.drt"));
        //
        KnowledgeBase knowledgeBase = createKnowledgeBaseFromSpreadsheet();
        session = knowledgeBase.newStatelessKnowledgeSession();

//
        Customer customer = Customer.newCustomer();
        ItemDetail findOne = itemDetailDao.findOne(id);
        customer.addItems(findOne.getProducts());
        //hard-code for testing.
        customer.setUltimate(findOne.getZzzd());
        customer.setPathology(findOne.getBlzd());
        customer.setEndoscope(findOne.getNjzd());
        LOG.info("new customer:"+customer.toString());

        session.execute(customer);
        //

        //
        ConsultInfoFull consultInfoFull  = null;
        try {
            long consultId = customer.getConsult();
            LOG.info("consultId:"+consultId);
            ConsultInfo find = consultInfoDao.findOne(consultId);
            //FIXME:join table to select.
            long instructionId = find.getIid();
            EInstruction eInstruction = eInstructionDao.findOne(instructionId);
            long prescriptionId = find.getPid();
            MPrescription mPrescription = mPrescriptionDao.findOne(prescriptionId);
            consultInfoFull = new ConsultInfoFull(eInstruction, mPrescription);
        }catch (NullPointerException ex){
            ////out of inference,turn to recommendation
        }
        return consultInfoFull;
    }

    private static KnowledgeBase createKnowledgeBaseFromSpreadsheet()
            throws Exception {
        DecisionTableConfiguration dtconf = KnowledgeBuilderFactory
                .newDecisionTableConfiguration();
        dtconf.setInputType(DecisionTableInputType.XLS);

        KnowledgeBuilder knowledgeBuilder = KnowledgeBuilderFactory
                .newKnowledgeBuilder();
        knowledgeBuilder.add(ResourceFactory
                .newClassPathResource("td_user_item.xls"),
                ResourceType.DTABLE, dtconf);

        if (knowledgeBuilder.hasErrors()) {
            throw new RuntimeException(knowledgeBuilder.getErrors().toString());
        }

        KnowledgeBase knowledgeBase = KnowledgeBaseFactory.newKnowledgeBase();
        knowledgeBase.addKnowledgePackages(knowledgeBuilder
                .getKnowledgePackages());
        return knowledgeBase;
    }

}
