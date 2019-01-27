import { Injectable } from '@angular/core';
import { TriplestoreService } from './triplestore.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as parse from 'wellknown';

@Injectable()
export class PipesService extends TriplestoreService {

    public getPipeInterfaces(): Observable<any>{
        var q = `
            PREFIX pip: <https://example.org/pip#>
            SELECT * WHERE {
                GRAPH ?g{
                    ?s a pip:PipeZoneInterface ;
                        pip:touchesPipe ?pipe ;
                        pip:touchesZone ?zone}
                }`;
        return this.getQuery(q);
    }

    public getPipesIntersectingZone(zoneURI): Observable<any>{
        var q = `
            PREFIX pip: <https://example.org/pip#>
            PREFIX bot: <https://w3id.org/bot#>
            SELECT ?uri ?geometry WHERE {
                GRAPH ?g{
                    ?uri a pip:PipeZoneInterface ;
                        pip:touchesPipe ?pipe ;
                        pip:touchesZone <${zoneURI}> .
                    ?uri bot:hasSimple3dModel ?geometry .
                }
            }`;
        return this.getQuery(q)
            .pipe(
                map(res => {
                    var d = res.map(item => {
                        return {
                            name: 'a', 
                            uri: item.uri.value,
                            geometry: item.geometry.value,
                            color: '#F00',
                            type: 'Element',
                        }
                    });
                    return {data: d, query: q};
                })
            );
    }

}