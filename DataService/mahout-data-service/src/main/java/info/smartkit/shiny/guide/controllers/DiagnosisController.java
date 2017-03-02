package info.smartkit.shiny.guide.controllers;

import com.javacodegeeks.drools.model.Customer;
import com.javacodegeeks.drools.model.Product;
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import info.smartkit.shiny.guide.dao.ItemDetailDao;
import info.smartkit.shiny.guide.dao.ItemInfoDao;
import info.smartkit.shiny.guide.dao.UserInfoDao;
import info.smartkit.shiny.guide.settings.DataBaseSettings;
import info.smartkit.shiny.guide.utils.MahoutUtils;
import info.smartkit.shiny.guide.vo.ItemDetail;
import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.model.JDBCDataModel;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
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
    private ItemInfoDao itemInfoDao;

    @Autowired
    private ItemDetailDao itemDetailDao;

    private static Logger LOG = LogManager.getLogger(RecommendController.class);

    private static StatelessKnowledgeSession session;

    @RequestMapping(value = "user/{id}", method = RequestMethod.GET)
    @ApiOperation(httpMethod = "GET", value = "Response a diagnosis describing if the user's diagnosis  is successfully get or not.")
    public String getByUser(@PathVariable("id") long id) throws Exception {
        //

        KnowledgeBase knowledgeBase = createKnowledgeBaseFromSpreadsheet();
        session = knowledgeBase.newStatelessKnowledgeSession();

//        Customer customer = new Customer();
//        ItemDetail findOne = itemDetailDao.findOne(id);
//        customer.addItems(findOne.getProducts());
//        customer.setCoupon("DISC01");
//        session.execute(customer);
//
//        return ("First Customer\n" + customer);

//        Customer customer = Customer.newCustomer();
//        ItemDetail findOne = itemDetailDao.findOne(id);
//        customer.addItems(findOne.getProducts());
//        customer.setCoupon("DISC01");
//        session.execute(customer);
//
//        return ("First Customer\n" + customer);
        Customer customer = Customer.newCustomer();
        ItemDetail findOne = itemDetailDao.findOne(id);
        customer.addItems(findOne.getProducts());
        customer.setUltimate(findOne.getZzzd());
        session.execute(customer);

        return ("First Customer\n" + customer);
        //

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
