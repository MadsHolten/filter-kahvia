import { Injectable } from '@angular/core';
import { TriplestoreService } from './triplestore.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class GeoModelService extends TriplestoreService {

    public getSomeData(): Observable<any>{
        var q = `SELECT * WHERE {?s ?p ?o} LIMIT 10`;
        return this.getQuery(q);
    }

    public getSpaceModel(){
        const q = `
        PREFIX bot:    <https://w3id.org/bot#>
        PREFIX props:  <https://w3id.org/props#>
        PREFIX opm:    <https://w3id.org/opm#>
        PREFIX schema: <http://schema.org/>
        SELECT ?uri ?name ?geometry
        WHERE {
            ?uri a bot:Space ;
                props:identityDataName/opm:hasPropertyState [
                    a opm:CurrentPropertyState ;
                    schema:value ?name
                ] ;
                bot:hasSimple3DModel/opm:hasPropertyState [
                    a opm:CurrentPropertyState ;
                    schema:value ?geometry
                ] .
        }
    `;

    return this.getQuery(q)
        .pipe(
            map(res => {
                var d = res.map(item => {
                    return {
                        name: item.name.value, 
                        uri: item.uri.value,
                        geometry: item.geometry.value,
                        opacity: 0.3,
                        type: 'Zone'
                    }
                });
                return {data: d, query: q};
            })
        );
    }

    public getResourceData(URI){
        var q = `SELECT * WHERE {<${URI}> ?p ?o}`;
        return this.getQuery(q);
    }

}