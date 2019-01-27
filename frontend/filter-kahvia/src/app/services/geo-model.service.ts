import { Injectable } from '@angular/core';
import { TriplestoreService } from './triplestore.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as parse from 'wellknown';

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
                GRAPH ?g {
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
                            type: 'Zone',
                            color: '#ccc'
                        }
                    });
                    return {data: d, query: q};
                })
            );
    }

    public getPipes(){
        const q = `
            PREFIX bot:    <https://w3id.org/bot#>
            PREFIX props:  <https://w3id.org/props#>
            PREFIX opm:    <https://w3id.org/opm#>
            PREFIX pip:    <https://example.org/pip#>
            PREFIX schema: <http://schema.org/>
            SELECT ?uri ?geometry
            WHERE {
                GRAPH ?g {
                    ?uri a pip:PipeSegment ;
                        bot:hasSimple3DModel ?geometry
                }
            }
        `;

        return this.getQuery(q)
            .pipe(
                map(res => {
                    var d = res.map(item => {
                        return {
                            name: "Pipe", 
                            uri: item.uri.value,
                            geometry: item.geometry.value,
                            type: 'Element'
                        }
                    });
                    return {data: d, query: q};
                })
            );
    }

    public getRooms2D(): Observable<any> {
        const q = `
        PREFIX bot:     <https://w3id.org/bot#>
        PREFIX opm:     <https://w3id.org/opm#>
        PREFIX schema:  <http://schema.org/>
        PREFIX props:   <https://w3id.org/props#>
        PREFIX geo:     <http://www.opengis.net/ont/geosparql#>
        PREFIX inst:    <https://w3id.org/ibp/bot4osh/>
        SELECT DISTINCT ?uri ?name ?geometry2d
        WHERE {
            GRAPH ?g{
                ?uri a bot:Space .
                ?uri props:identityDataName/opm:hasPropertyState ?ns ;
                    props:hasSimple2DBoundary/opm:hasPropertyState ?gs .
                ?ns a opm:CurrentPropertyState ;
                    schema:value ?name .
                ?gs a opm:CurrentPropertyState ;
                    schema:value ?geometry2d .
                FILTER(str(?geometry2d) != "POLYGON ()")
            }
        }`;

        return this.getQuery(q)
                .pipe(
                    map(res => {
                        var data = this._resToGeoJSON(res);
                        return {data: data, query: q};
                    })
                );
    }

    public getResourceData(URI){
        var q = `SELECT * WHERE {<${URI}> ?p ?o}`;
        return this.getQuery(q);
    }

    public getAllRooms(){
        var q = `
            PREFIX bot:     <https://w3id.org/bot#>
            PREFIX opm:     <https://w3id.org/opm#>
            PREFIX schema:  <http://schema.org/>
            PREFIX props:   <https://w3id.org/props#>
            SELECT ?uri ?name WHERE {
                GRAPH ?g {
                ?uri a bot:Space ;
                    props:identityDataName/opm:hasPropertyState [
                    a opm:CurrentPropertyState ;
                    schema:value ?name
                ]}}`;
        return this.getQuery(q);
    }

    public getAllRoomsWithHeatDemand() {
        var q = `
        PREFIX bot: <https://w3id.org/bot#>
        PREFIX props: <https://w3id.org/product/props#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX opm: <https://w3id.org/opm#>
        PREFIX prov: <http://www.w3.org/ns/prov#>
        PREFIX arch: <http://architect.com/projects/>
        PREFIX ice: <http://ice-engineer.com/projects/>

        CONSTRUCT{
            ?space props:heatingDemand ?newPropertyURI .
            ?newPropertyURI opm:hasState ?newStateURI .
            ?newStateURI a opm:CurrentState ;
                opm:value ?hd ;
                prov:generatedAtTime ?now .
        }
        WHERE {
        BIND(props:revitarea AS ?prop)
        BIND(arch:17001 AS ?gArch)
        BIND(ice:1001 AS ?gICE)
        ?space a bot:Space ;
                    <https://w3id.org/props#dimensionsArea> ?propURI .
                ?propURI opm:hasPropertyState  [ a opm:CurrentPropertyState ; <http://schema.org/value> ?area ]
        BIND( (20 * ?area) AS ?hd )
        BIND(REPLACE(STR(UUID()), "urn:uuid:", "") AS ?guid1)
        BIND(REPLACE(STR(UUID()), "urn:uuid:", "") AS ?guid2)
        BIND( URI(CONCAT(STR(?gICE), "#", "property_", ?guid1)) AS ?newPropertyURI )
        BIND( URI(CONCAT(STR(?gICE), "#", "state_", ?guid1)) AS ?newStateURI )
        BIND( NOW() AS ?now )
        }
        `;

        return this.getQuery(q, null, 'construct');
    }

    private _resToGeoJSON(res){
        var geoJSON = {type: "FeatureCollection", features: []};

        res.forEach(d => {
            var uri: string = d.uri.value;
            var name: string = d.name.value;
            var geometry2d: any = parse(d.geometry2d.value);

            geometry2d.coordinates = [geometry2d.coordinates];

            // var properties = {name: name, uri: uri, color: '#eee'};
            var properties = {name: name, uri: uri, color: '#eee'};
            var obj = {type: "Feature", id: uri, geometry: geometry2d, properties: properties};
            geoJSON.features.push(obj);
        });

        return geoJSON;
    }

}