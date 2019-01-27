import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

export interface ProjectSettings {
  endpoint: string;
  username?: string;
  password?: string;
}

@Injectable()
export class TriplestoreService {

    // private endpoint: string = "http://10.2.61.126:3030/1/query";
    private endpoint: string = "http://10.2.44.41:3030/1/query";
    // private endpoint: string = "http://localhost:3030/1/query";

    constructor(
        public http: HttpClient
    ) { 
        console.log("Running on hardcoded endpoint: "+this.endpoint);
    }

  public getQuery(query, reasoning?, queryType?){

    var options: any = {};

    // define search parameters
    var params = new HttpParams()
      .set('query', query).set('reasoning', reasoning);
    options.params = params;

    // query type
    if(queryType == 'construct'){
      options.headers = {'Accept': 'application/ld+json'};
    }else{
      options.headers = {'Accept': 'application/sparql-results+json'}
    }

    var url = `${this.endpoint}`;

    if(queryType == 'construct'){
      console.log('Using construct');
      return this.http.get(url, options);
    }
    else{
      return this.http.get(url, options)
        .pipe(
          map(res => {
            var data: any = res;
            return data.results.bindings
          })
        );
    }

  }

  public getAllPredicates(graphURI?){
      var q = `
        SELECT DISTINCT ?p
        WHERE {`
      if(graphURI) q+= `GRAPH ?g {`;
      q+= `?s ?p ?o}`;
      if(graphURI) q+= `}`;

      var pfx = this.http.get('./assets/prefixes.json').toPromise();
      
      return this.getQuery(q)
            .pipe(
                map(res => res.map(x => x.p.value))
            );

      
  }

}