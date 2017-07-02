package info.smartkit.shiny.guide.service;

import info.smartkit.shiny.guide.dto.ConsultInfoFull;

/**
 * Created by smartkit on 02/07/2017.
 */
public interface DiagnosisService {
        ConsultInfoFull inferByFacts(long uiId) throws Exception;
}
