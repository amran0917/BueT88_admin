import { MemberService } from '../services/member.service';
import { AddMember } from '../interface/AddMember.interface';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, merge } from 'rxjs';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';

export class CustomDataSource extends DataSource<AddMember> {
    private filterChange = new BehaviorSubject('');
    get filter(): string {
         return this.filterChange.value;
    }
    set filter(filter: string) {
         this.filterChange.next(filter);
    }

    filteredData: AddMember[] = [];
    renderedData: AddMember[] = [];
    constructor(public exampleDatabase: MemberService, public paginator: MatPaginator, public _sort: MatSort) {
                super();
                this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    connect(): Observable<AddMember[]> {
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
                this.filteredData = this.exampleDatabase.data.slice().filter((issue: AddMember) => {
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

    sortData(data: AddMember[]): AddMember[] {

        if (!this._sort.active || this._sort.direction === '') {
            return data;
          }
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'Id': [propertyA, propertyB] = [a.Id, b.Id]; break;
                case 'Name': [propertyA, propertyB] = [a.Name, b.Name]; break;
                case 'MemberAddedOn': [propertyA, propertyB] = [a.MemberAddedOn, b.MemberAddedOn]; break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

}
