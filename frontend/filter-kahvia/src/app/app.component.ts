import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { QueryDialogComponent } from './components/dialogs/query-dialog.component';

import { GeoModelService } from './services/geo-model.service';
import { PipesService } from './services/pipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GeoModelService, PipesService]
})
export class AppComponent implements OnInit {

  data3d;
  data2d;
  colors;
  viewMode: string = '3d';
  buttons = ["Query geometry"]

  // View
  showPipes: boolean = false;

  constructor(
    private _gms: GeoModelService,
    private _ps: PipesService,
    public dialog: MatDialog
  ){}

  ngOnInit(){
    this.get3DNoPipes();
    // this.get3DPipes();

    this._ps.getPipeInterfaces().subscribe(res => {
      console.log(res);
    }, err => console.log(err));
  }

  public get3DNoPipes(){
    this._gms.getSpaceModel().subscribe(res => {
      this.data3d = res.data;
    }, err => console.log(err));
  }

  public get3DPipes(){
    this._gms.getSpaceModel().subscribe(res => {
      var data = res.data;
      this._gms.getPipes().subscribe(res => {
        this.data3d = data.concat(res.data);
      }, err => console.log(err));
    }, err => console.log(err));
  }

  public togglePipes(){
    if(!this.showPipes){
      this.get3DPipes();
    }else{
      this.get3DNoPipes();
    }
    this.showPipes = !this.showPipes;
  }

  public clickedButton(ev){

    // On query Geometry
    if(ev == this.buttons[0]){
      let dialogRef = this.dialog.open(QueryDialogComponent, {
        height: '400px',
        width: '700px'
      });
    }
    
  }

  public getSome2D(){
    this._gms.getRooms2D().subscribe(res => {
      this.data2d = res.data;
    }, err => console.log(err));
  }

  public clickedRoom(ev){
    console.log(ev);
    var uri = ev.uri;

    this._gms.getSpaceModel().subscribe(res => {
      var data = res.data;
      this._ps.getPipesIntersectingZone(uri).subscribe(res => {
        this.data3d = data.concat(res.data);
      }, err => console.log(err));
    }, err => console.log(err));

    

    // this.colors = [{uri: ev.uri, value: 20, color: "#111", unit: "degC"}]
    

    // this._gms.getResourceData(ev.uri).subscribe(res => {
    //   console.log(res);
    // }, err => console.log(err));
  }

}