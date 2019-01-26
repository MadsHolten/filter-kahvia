package inference_model;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.rdf.model.InfModel;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.Selector;
import org.apache.jena.rdf.model.SimpleSelector;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.reasoner.Reasoner;
import org.apache.jena.reasoner.ReasonerRegistry;

public class HackInference {

	public HackInference () throws FileNotFoundException {
		 InputStream rdfListStream = new FileInputStream(new File("C:\\jo\\ttl_models\\Radiators_IFC_LBD.ttl"));
         OntModel model = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM_TRANS_INF);
         model.read(rdfListStream, null, "TTL"); 
		 InputStream botStream = new FileInputStream(new File("C:\\jo\\ttl_models\\bot.ttl"));
		 model.read(botStream, null, "TTL");
         
		Reasoner reasoner = ReasonerRegistry.getRDFSReasoner();
		InfModel inf = ModelFactory.createInfModel(reasoner, model);
		
		Resource r=model.createResource("https://w3id.org/bot#Zone");
		Selector s=new SimpleSelector(null, null, r);
		StmtIterator ite=inf.listStatements(s);
		ite.forEachRemaining(x->{
			System.out.println(x);
		});
		
	}

	public static void main(String[] args) {
		try {
			new HackInference();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
