import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { FormsModule } from '@angular/forms';


export interface Space {
  name: string;
  position: number;
  demand: number;
}

/**
 * @title Table with editing
 */
@Component({
  selector: 'heating-table',
  styleUrls: ['heating-table.component.css'],
  templateUrl: 'heating-table.component.html',
})
export class HeatingTableComponent implements OnInit {
  displayedColumns = ['position', 'name', 'demand'];

  @Input() dataSet: Space[];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    console.log('Data source: ' + this.dataSet);
    this.dataSource = new MatTableDataSource(this.dataSet);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}


