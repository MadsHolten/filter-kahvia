import { Component, OnInit } from '@angular/core';

import { GeoModelService } from './services/geo-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GeoModelService]
})
export class AppComponent implements OnInit {

  title = 'filter-kahvia2';

  data;

  constructor(
    private _gms: GeoModelService
  ){}

  ngOnInit(){
    console.log("hello world")
    this.getSome();
  }

  public getSome(){
    this._gms.getSpaceModel().subscribe(res => {
      this.data = res.data;
    }, err => console.log(err));
  }

  public clickedRoom(ev){
    this._gms.getResourceData(ev.uri).subscribe(res => {
      console.log(res);
    }, err => console.log(err));
  }

}