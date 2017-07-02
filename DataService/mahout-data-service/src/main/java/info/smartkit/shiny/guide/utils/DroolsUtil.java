package info.smartkit.shiny.guide.utils;

import info.smartkit.shiny.guide.dto.ConsultDecision;
import info.smartkit.shiny.guide.event.Event;
import info.smartkit.shiny.guide.rule.Rule;
import org.drools.template.ObjectDataCompiler;
import org.kie.api.KieServices;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.StatelessKieSession;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by smartkit on 02/07/2017.
 * @see http://oncodesign.io/2015/08/10/dynamically-create-rules-using-drools--rule-templates/
 */
public class DroolsUtil {

        static public ConsultDecision evaluate(String drl, Event event) throws Exception {
                KieServices kieServices = KieServices.Factory.get();
                KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
                kieFileSystem.write("src/main/resources/rule.drl", drl);
                kieServices.newKieBuilder(kieFileSystem).buildAll();

                KieContainer kieContainer = kieServices.newKieContainer(kieServices.getRepository().getDefaultReleaseId());
                StatelessKieSession statelessKieSession = kieContainer.getKieBase().newStatelessKieSession();

                ConsultDecision consultDecision = new ConsultDecision();
                statelessKieSession.getGlobals().set("consultDecision", consultDecision);
                statelessKieSession.execute(event);

                return consultDecision;
        }

        static public String applyRuleTemplate(Event event, Rule rule) throws Exception {
                Map<String, Object> data = new HashMap<String, Object>();
                ObjectDataCompiler objectDataCompiler = new ObjectDataCompiler();

                data.put("rule", rule);
                data.put("eventType", event.getClass().getName());

                return objectDataCompiler.compile(Arrays.asList(data), Thread.currentThread().getContextClassLoader().getResourceAsStream("rule-template.drl"));
        }
}
