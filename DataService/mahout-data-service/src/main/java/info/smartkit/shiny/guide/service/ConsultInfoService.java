package info.smartkit.shiny.guide.service;

import info.smartkit.shiny.guide.dto.ConsultInfoFull;
import info.smartkit.shiny.guide.vo.ConsultEinstrMpers;

/**
 * Created by smartkit on 03/07/2017.
 */
public interface ConsultInfoService {
        ConsultEinstrMpers findConsultEinstrMpers(long cid);
}
