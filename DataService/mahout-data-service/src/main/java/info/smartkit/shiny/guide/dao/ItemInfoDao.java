package info.smartkit.shiny.guide.dao;

import info.smartkit.shiny.guide.vo.ItemInfo;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by yangboz on 25/02/2017.
 */
public interface ItemInfoDao extends CrudRepository<ItemInfo, Long> {
}
