import { RememberService } from './../services/remember.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, merge } from 'rxjs';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';
import { Remember } from '../interface/Remember.interface';
export class CustomRemberDataSource extends DataSource<Remember> {
    private filterChange = new BehaviorSubject('');
    get filter(): string {
         return this.filterChange.value;
    }
    set filter(filter: string) {
         this.filterChange.next(filter);
    }

    filteredData: Remember[] = [];
    renderedData: Remember[] = [];
    constructor(public exampleDatabase: RememberService, public paginator: MatPaginator, public sort: MatSort) {
                super();
                this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    connect(): Observable<Remember[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
          this.exampleDatabase.dataChange,
          this.sort.sortChange,
          this.filterChange,
          this.paginator.page
        ];

        // console.log(this.exampleDatabase.dataChange);
        this.exampleDatabase.getAllIssues();
        return merge(...displayDataChanges).pipe(
            map(() => {
                this.filteredData = this.exampleDatabase.data.slice().filter((issue: Remember) => {
                    const searchStr = (issue.Id + issue.Name).toLowerCase();
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

    sortData(data: Remember[]): Remember[] {

        if (!this.sort.active || this.sort.direction === '') {
            return data;
          }
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this.sort.active) {
                case 'Id': [propertyA, propertyB] = [a.Id, b.Id]; break;
                case 'Name': [propertyA, propertyB] = [a.Name, b.Name]; break;
                case 'Department': [propertyA, propertyB] = [a.Department, b.Department]; break;
                case 'MemberAddedOn': [propertyA, propertyB] = [a.MemberAddedOn, b.MemberAddedOn]; break;
                case 'Hall': [propertyA, propertyB] = [a.Hall, b.Hall]; break;

            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }

}
