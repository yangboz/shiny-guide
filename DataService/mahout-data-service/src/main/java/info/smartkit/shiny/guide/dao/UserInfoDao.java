package info.smartkit.shiny.guide.dao;

import info.smartkit.shiny.guide.dto.UserInfo;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
/**
 * Created by smartkit on 20/02/2017.
 */
public interface UserInfoDao extends CrudRepository<UserInfo, Long> {
//    List<UserInfo> findAllByOrderByTimeAsc();
}
