package info.smartkit.shiny.guide.dao;

import info.smartkit.shiny.guide.vo.MPrescription;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by yangboz on 23/02/2017.
 */
public interface MPrescriptionDao extends CrudRepository<MPrescription, Long> {
}
