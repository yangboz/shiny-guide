package info.smartkit.shiny.guide.controllers;

/**
 * Created by yangboz on 23/02/2017.
 */

import info.smartkit.shiny.guide.dao.MPrescriptionDao;
import info.smartkit.shiny.guide.dto.JsonObject;
import info.smartkit.shiny.guide.vo.MPrescription;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.ws.rs.core.MediaType;

@RestController
// @see: http://spring.io/guides/gs/reactor-thumbnailer/
@RequestMapping(value = "/Mprescription")
public class MPrescriptionController {

    @Autowired
    private MPrescriptionDao DAO;

    /**
     * Posting anew UserInfo
     *
     * @param MPrescription
     * @return Response a string describing if the user info is successfully created or not.
     */
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON)
    @ApiOperation(httpMethod = "POST", value = "Response a string describing if the user info is successfully created or not.")
    public JsonObject create(@RequestBody @Valid MPrescription info) {
        return new JsonObject(DAO.save(info));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ApiOperation(httpMethod = "GET", value = "Response a string describing if the user info id is successfully get or not.")
    public JsonObject get(@PathVariable("id") long id) {
        return new JsonObject(this.DAO.findOne(id));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ApiOperation(httpMethod = "DELETE", value = "Response a string describing if the user info is successfully delete or not.")
    public JsonObject delete(@PathVariable("id") long id) {
        try {
            this.DAO.delete(id);
        } catch (Exception e) {
            return new JsonObject(e.toString());
        }
        return new JsonObject(new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK));
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(httpMethod = "GET", value = "Response a list describing all of user info that is successfully get or not.")
    public JsonObject list() {
//		return new JsonObject(this._alarmInfoDao.findAll());
        return new JsonObject(this.DAO.findAll());
    }

//    @RequestMapping(value = "/{id}/status/{value}", method = RequestMethod.PUT)//
//    @ApiOperation(httpMethod = "PUT", value = "Response a string describing if the alarm status is successfully patched or not.")
//    public JsonObject patch(@PathVariable("id") long id, @PathVariable("value") int value) {
//        UserInfo find = this.userInfoDao.findOne(id);
//        find.setStatus(value);
//        return new JsonObject(this.userInfoDao.save(find));
//    }
}
