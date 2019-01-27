import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TriplestoreService } from '../../services/triplestore.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'msg-dialog',
    templateUrl: './query-dialog.component.html',
    styleUrls: ['./query-dialog.component.css'],
    providers: [TriplestoreService]
})
export class QueryDialogComponent implements OnInit {

    predicates: string[];
    filteredPredicates: Observable<string[]>;
    predicateCtrl = new FormControl();

    constructor(
        public dialogRef: MatDialogRef<QueryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _ts: TriplestoreService) { }

    ngOnInit(){
        this._ts.getAllPredicates(true).subscribe(res => {
            this.predicates = res;
        }, err => console.log(err));

        this.filteredPredicates = this.predicateCtrl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterPredicates(value))
            );
    }

    // Close when clicking outside
    onNoClick(): void {
        this.dialogRef.close();
    }

    private _filterPredicates(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.predicates.filter(p => p.toLowerCase().indexOf(filterValue) === 0);
    }

    doQuery(){

    }

}