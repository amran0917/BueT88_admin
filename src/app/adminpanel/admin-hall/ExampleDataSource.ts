import { WorkService } from './../../services/work.service';
import { AddHall } from './../../interface/AddHall.interface';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, merge } from 'rxjs';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';

export class ExampleDataSource extends DataSource<AddHall> {
    private filterChange = new BehaviorSubject('');
    get filter(): string {
         return this.filterChange.value;
    }
    set filter(filter: string) {
         this.filterChange.next(filter);
    }

    filteredData: AddHall[] = [];
    renderedData: AddHall[] = [];
    constructor(public exampleDatabase: WorkService, public paginator: MatPaginator, public _sort: MatSort) {
                super();
                this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    connect(): Observable<AddHall[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
          this.exampleDatabase.dataChange,
          this._sort.sortChange,
          this.filterChange,
          this.paginator.page
        ];

        // console.log(this.exampleDatabase.dataChange);
        this.exampleDatabase.getAllIssues();
        return merge(...displayDataChanges).pipe(
            map(() => {
                this.filteredData = this.exampleDatabase.data.slice().filter((issue: AddHall) => {
                    const searchStr = (issue.code + issue.name).toLowerCase();
                    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
                });

                const sortedData = this.sortData(this.filteredData.slice());
                // splice of the filtered sorted data.
                const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
                this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
                return this.renderedData;
            })

        );
    }
    disconnect() {}

    sortData(data: AddHall[]): AddHall[] {

        if (!this._sort.active || this._sort.direction === '') {
            return data;
          }
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'Id': [propertyA, propertyB] = [a.code, b.code]; break;
                case 'Name': [propertyA, propertyB] = [a.name, b.name]; break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

}
