import { Component, OnInit } from '@angular/core';

import { GeoModelService } from './services/geo-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GeoModelService]
})
export class AppComponent implements OnInit {

  data3d;
  data2d
  viewMode: string = '3d';

  constructor(
    private _gms: GeoModelService
  ){}

  ngOnInit(){
    this.getSome3D();
    this.getSome2D();
  }

  public getSome3D(){
    this._gms.getSpaceModel().subscribe(res => {
      var data = res.data;
      this._gms.getPipes().subscribe(res => {
        this.data3d = data.concat(res.data);
      }, err => console.log(err));
    }, err => console.log(err));
  }

  public getSome2D(){
    this._gms.getRooms2D().subscribe(res => {
      this.data2d = res.data;
    }, err => console.log(err));
  }

  public clickedRoom(ev){
    console.log(ev);
    this._gms.getResourceData(ev.uri).subscribe(res => {
      console.log(res);
    }, err => console.log(err));
  }

}