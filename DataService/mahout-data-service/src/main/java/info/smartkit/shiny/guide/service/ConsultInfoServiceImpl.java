package info.smartkit.shiny.guide.service;

import info.smartkit.shiny.guide.dto.ConsultInfoFull;
import info.smartkit.shiny.guide.vo.ConsultEinstrMpers;
import info.smartkit.shiny.guide.vo.UserItemConsultInfoIdDetails;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by smartkit on 03/07/2017.
 */
@Service
public class ConsultInfoServiceImpl implements ConsultInfoService {

        @PersistenceContext
        private EntityManager em;

        private static Logger LOG = LogManager.getLogger(ConsultInfoServiceImpl.class);

        @Override public ConsultEinstrMpers findConsultEinstrMpers(long cid) {
                String nativeQuery = "select consult_info.id as id,mprescription.id as mpid, einstruction.id as eiid , consult_info.id as hsvs,consult_info.id as rgbs,consult_info.id as labs,"
                        + "einstruction.name as einame, einstruction.content as eicontent,mprescription.name as mpname,"
                        + "mprescription.content as mpcontent from consult_info "
                        + "left join mprescription on consult_info.pid = mprescription.id "
                        + "left join einstruction on consult_info.iid = einstruction.id where consult_info.id =" +cid;
                //
                ConsultEinstrMpers consultEinstrMpers=  (ConsultEinstrMpers)this.em.createNativeQuery(nativeQuery,ConsultEinstrMpers.class).getResultList().get(0);
                LOG.info("native query consultEinstrMpers:"+consultEinstrMpers);
                return consultEinstrMpers;
        }
}
