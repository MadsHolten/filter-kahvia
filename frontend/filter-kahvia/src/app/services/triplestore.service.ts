import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface ProjectSettings {
  endpoint: string;
  username?: string;
  password?: string;
}

@Injectable()
export class TriplestoreService {

    private endpoint: string = "http://10.2.61.134:3030/test/query";

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

}