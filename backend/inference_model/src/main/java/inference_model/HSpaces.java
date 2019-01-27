package inference_model;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;

public class HSpaces {

	public HSpaces () throws FileNotFoundException {
		 InputStream rdfListStream = new FileInputStream(new File("C:\\jo\\ttl_models\\testmodel.ttl"));
         OntModel model = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM_TRANS_INF);
         model.read(rdfListStream, null, "TTL"); 
		 
        
         String szQuery ="PREFIX bot: <https://w3id.org/bot#>\r\n" + 
         		"PREFIX props: <https://w3id.org/product/props#>\r\n" + 
         		"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\r\n" + 
         		"PREFIX opm: <https://w3id.org/opm#>\r\n" + 
         		"PREFIX prov: <http://www.w3.org/ns/prov#>\r\n" + 
         		"PREFIX arch: <http://architect.com/projects/>\r\n" + 
         		"PREFIX ice: <http://ice-engineer.com/projects/>\r\n" + 
         		"\r\n" + 
         		"CONSTRUCT{\r\n" + 
         		"	?space props:heatingDemand ?newPropertyURI .\r\n" + 
         		"	?newPropertyURI opm:hasState ?newStateURI .\r\n" + 
         		"	?newStateURI a opm:CurrentState ;\r\n" + 
         		"		opm:value ?hd ;\r\n" + 
         		"		prov:wasDerivedFrom ?stateURI ;\r\n" + 
         		"		prov:generatedAtTime ?now .\r\n" + 
         		"}\r\n" + 
         		"WHERE {\r\n" + 
         		"	BIND(props:revitarea AS ?prop)\r\n" + 
         		"	BIND(arch:17001 AS ?gArch)\r\n" + 
         		"	BIND(ice:1001 AS ?gICE)\r\n" + 
         		"	GRAPH ?gArch {\r\n" + 
         		"		?space a bot:Space ;\r\n" + 
         		"			?prop ?propURI .\r\n" + 
         		"		?propURI opm:hasState [ a opm:CurrentState ; opm:value ?area ]\r\n" + 
         		"	}\r\n" + 
         		"	# CALCULATE DUMMY HEATING DEMAND\r\n" + 
         		"	BIND( CEILING(20 * ?area) AS ?hd )\r\n" + 
         		"  \r\n" + 
         		"  	# GENERATE URIS\r\n" + 
         		"	BIND(REPLACE(STR(UUID()), \"urn:uuid:\", \"\") AS ?guid1)\r\n" + 
         		"	BIND(REPLACE(STR(UUID()), \"urn:uuid:\", \"\") AS ?guid2)\r\n" + 
         		"	BIND( URI(CONCAT(STR(?gICE), \"#\", \"property_\", ?guid1)) AS ?newPropertyURI )\r\n" + 
         		"	BIND( URI(CONCAT(STR(?gICE), \"#\", \"state_\", ?guid1)) AS ?newStateURI )\r\n" + 
         		"	BIND( NOW() AS ?now )\r\n" + 
         		"} \r\n" + 
         		"LIMIT 1";
     	
         Query query = QueryFactory.create(szQuery) ;
         QueryExecution qexec = QueryExecutionFactory.create(query, model);
             
         Model constructModel = qexec.execConstruct();
         System.out.println("Construct result = " + constructModel.toString());
             
         qexec.close();
         constructModel.close();
		
	}

	public static void main(String[] args) {
		try {
			new HSpaces();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
