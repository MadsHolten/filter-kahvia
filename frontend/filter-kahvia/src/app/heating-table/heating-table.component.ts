import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { GeoModelService } from '../services/geo-model.service';
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
  providers: [GeoModelService]
})
export class HeatingTableComponent implements OnInit {
  displayedColumns = ['position', 'name', 'demand'];
  rooms;

  constructor(private _gms: GeoModelService){}

  @Input() dataSet: Space[];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this._gms.getAllRooms().subscribe(res => {
      this.rooms = res;
      //console.log('Rooms: ' + this.rooms);

      let spaces: Space[] = [];

      for (let i = 0; i < this.rooms.length; i++) {
        let name = this.rooms[i].name.value;

        let random = Math.floor(Math.random() * 20);
        let space: Space = {
          position: i,
          name: name,
          demand: 20 + random
        };

        spaces.push(space);
      }

      //console.log('Data source: ' + this.dataSet);
      this.dataSource = new MatTableDataSource(spaces);
      this.dataSource.sort = this.sort;  
    }, err => console.log(err));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}


