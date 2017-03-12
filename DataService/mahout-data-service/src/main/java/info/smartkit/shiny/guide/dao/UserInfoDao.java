package info.smartkit.shiny.guide.dao;

import info.smartkit.shiny.guide.vo.UserInfo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by smartkit on 20/02/2017.
 */
public interface UserInfoDao extends CrudRepository<UserInfo, Long> {
    List<UserInfo> findByConsultId(long cid);
}
