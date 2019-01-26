import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HeatingTableComponent } from '../heating-table/heating-table.component';

export interface Space {
  name: string;
  position: number;
  demand: number;
}

const ELEMENT_DATA: Space[] = [
  {position: 1, name: 'Meeting room', demand: 30 },
  {position: 2, name: 'Open Office', demand: 40 },
  {position: 3, name: 'Lobby', demand: 25 },
  {position: 4, name: 'Main area', demand: 20 },
];

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  providers: [MatDialog]
})

export class PopupComponent implements OnInit {

  dataSpaces = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

}
