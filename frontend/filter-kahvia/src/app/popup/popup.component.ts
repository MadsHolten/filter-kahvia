import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HeatingTableComponent } from '../heating-table/heating-table.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  providers: [MatDialog, HeatingTableComponent]
})
export class PopupComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

}
