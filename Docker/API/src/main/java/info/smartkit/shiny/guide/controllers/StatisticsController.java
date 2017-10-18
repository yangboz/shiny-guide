package info.smartkit.shiny.guide.controllers;

import info.smartkit.shiny.guide.dao.ConsultInfoDao;
import info.smartkit.shiny.guide.dao.UserInfoDao;
import info.smartkit.shiny.guide.dto.JsonObject;
import info.smartkit.shiny.guide.service.DiagnosisService;
import info.smartkit.shiny.guide.vo.ConsultEinstrMpers;
import info.smartkit.shiny.guide.vo.ConsultInfo;
import info.smartkit.shiny.guide.vo.UserInfo;
import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by smartkit on 29/09/2017.
 */
@RestController
// @see: http://spring.io/guides/gs/reactor-thumbnailer/
@RequestMapping(value = "/stat")
public class StatisticsController {
    @Autowired
    private UserInfoDao userInfoDao;
    @Autowired DiagnosisService diagnosisService;

    private static Logger LOG = LogManager.getLogger(StatisticsController.class);

    @RequestMapping(value = "user/infer/null", method = RequestMethod.GET)
    @ApiOperation(httpMethod = "GET", value = "Response a user list who has null inference.")
    public List<UserInfo> getInferedNullUsers() throws Exception {
        Iterable<UserInfo> allUserInfos =  userInfoDao.findAll();
        List<UserInfo> nullInferUsers = new ArrayList<>();
        for (UserInfo userInfo : allUserInfos) {
            LOG.info("before getInferedNullUsers, uid:"+userInfo.getId());
            List<ConsultEinstrMpers> inferResults = diagnosisService.inferByFacts(userInfo.getItemId(), 0);
            if (inferResults.size() == 0) {LOG.info("after getInferedNullUsers, uid:"+userInfo.getId());
                nullInferUsers.add(userInfo);
            }
        }
        LOG.info("statistics(getInferedNullUsers:"+nullInferUsers.toString());
        return  nullInferUsers;
    }
}
