package info.smartkit.shiny.guide.controllers;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import info.smartkit.shiny.guide.dao.UserInfoDao;
import info.smartkit.shiny.guide.dto.JsonObject;
import info.smartkit.shiny.guide.settings.DataBaseSettings;
import info.smartkit.shiny.guide.settings.UploadSettings;
import info.smartkit.shiny.guide.utils.MahoutUtils;
import info.smartkit.shiny.guide.vo.UserInfo;
import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.model.JDBCDataModel;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by smartkit on 27/02/2017.
 */
@RestController
// @see: http://spring.io/guides/gs/reactor-thumbnailer/
@RequestMapping(value = "/recommend")
public class RecommendController {

    @Autowired
    private UserInfoDao userInfoDao;

    @Autowired
    private DataBaseSettings dataBaseSettings;

    private static Logger LOG = LogManager.getLogger(RecommendController.class);

    @RequestMapping(value = "user/{id}", method = RequestMethod.GET)
    @ApiOperation(httpMethod = "GET", value = "Response a recommend list describing if the user/item based recommend is successfully get or not.")
    public List<RecommendedItem> getByUser(@PathVariable("id") long id) throws TasteException, IOException {
        //
        List<RecommendedItem> recommendations = null;

        MahoutUtils.userCF(this.getJDBCDataModel());

        return recommendations;
    }

    @RequestMapping(value = "item/{id}", method = RequestMethod.GET)
    @ApiOperation(httpMethod = "GET", value = "Response a recommend list describing if the user/item based recommend is successfully get or not.")
    public List<RecommendedItem> getByItem(@PathVariable("id") long id) throws IOException, TasteException {

        List<RecommendedItem> recommendations = null;

        MahoutUtils.userCF(this.getJDBCDataModel());

        return recommendations;
    }

    private JDBCDataModel getJDBCDataModel(){
        //Creating data model
        MysqlDataSource dataSource = new MysqlDataSource();
        dataSource.setServerName(dataBaseSettings.getServer());
        dataSource.setUser(dataBaseSettings.getUsername());
        dataSource.setPassword(dataBaseSettings.getPassword());
        dataSource.setDatabaseName(dataBaseSettings.getDatabase());
        JDBCDataModel datamodel = new MySQLJDBCDataModel(dataSource,
                "user_info", "id", "item_id", "consult_id", null);
        return datamodel;
    }


}