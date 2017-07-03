package info.smartkit.shiny.guide.service;

import info.smartkit.shiny.guide.vo.ConsultEinstrMpers;
import info.smartkit.shiny.guide.vo.UserItemConsultInfoIdDetails;

import java.util.List;

/**
 * Created by smartkit on 02/07/2017.
 */
public interface DiagnosisService {
        ConsultEinstrMpers inferByFacts(long uiId) throws Exception;
        List<UserItemConsultInfoIdDetails> findUserItemConsultInfoDetail()throws Exception;
}
