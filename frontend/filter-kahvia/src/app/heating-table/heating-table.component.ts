import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';

export interface HeatingDemang {
  position: number;
  name: string;
  demand: number;
}

const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Room 1', demand: 20 },
  { position: 2, name: 'Room 2', demand: 25 },
  { position: 3, name: 'Room 3', demand: 30 },
];

@Component({
  selector: 'app-heating-table',
  templateUrl: './heating-table.component.html',
  styleUrls: ['./heating-table.component.css']
})
export class HeatingTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'demand'];
  dataSource = ELEMENT_DATA;

  constructor(
  ) { }

  ngOnInit() {

  }

}


