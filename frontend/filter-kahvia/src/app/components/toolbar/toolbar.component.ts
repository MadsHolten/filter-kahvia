import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

  }

  showHeatingDemands(){
    let dialogRef = this.dialog.open(PopupComponent, {
      height: '300px',
      width: '500px',
    });
}


}
