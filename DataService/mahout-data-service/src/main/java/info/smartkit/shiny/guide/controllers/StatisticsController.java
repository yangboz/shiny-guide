package info.smartkit.shiny.guide.controllers;

import info.smartkit.shiny.guide.dao.ConsultInfoDao;
import info.smartkit.shiny.guide.dao.UserInfoDao;
import info.smartkit.shiny.guide.dto.JsonObject;
import info.smartkit.shiny.guide.vo.ConsultEinstrMpers;
import info.smartkit.shiny.guide.vo.ConsultInfo;
import info.smartkit.shiny.guide.vo.UserInfo;
import io.swagger.annotations.ApiOperation;
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

    @RequestMapping(value = "user/infer/null", method = RequestMethod.GET)
    @ApiOperation(httpMethod = "GET", value = "Response a user list who has null inference.")
    public List<UserInfo> getInferedNullUsers() throws Exception {
        List<UserInfo> allUserInfos = userInfoDao.findAll();
        List<UserInfo> nullInferUsers = new ArrayList<>();
        for (UserInfo userInfo : allUserInfos) {
            List<ConsultEinstrMpers> inferResults = diagnosisService.inferByFacts(userInfo.getItemId(), 0);
            if (inferResults.size() == 0) {
                nullInferUsers.add(userInfo);
            }
        }
        LOG.info("statistics(getInferedNullUsers):"+nullInferUsers.toString());
        return  nullInferUsers;
    }
}
