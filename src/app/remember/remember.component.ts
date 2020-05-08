import { CustomRemberDataSource } from './CustomRemberDataSource';
import { Remember } from './../interface/Remember.interface';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RememberService } from '../services/remember.service';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.scss']
})
export class RememberComponent implements OnInit, AfterViewInit {

  public displayedColumns: any;
  exampleDatabase: RememberService | null;
  dataSource: CustomRemberDataSource | null;
  index: number;
  Id: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  memberConfigs = [
    {name: 'Id'},
    {name: 'Image'},
    {name: 'Name'},
    {name: 'MemberAddedOn'},
    {name: 'Department'},
    {name: 'Hall'},
    {name: 'Action'}
  ];

  constructor(public httpClient: HttpClient, private dataService: RememberService) { }

  ngOnInit(): void {

      this.getmemberConfigCall();
      this.loadData();


    }
    refresh() {
      this.loadData();
    }

  ngAfterViewInit(): void {
    // this.datasource.sort = this.sort;
  }

  public  getmemberConfigCall(): any {
    this.displayedColumns = this.memberConfigs.map(item  => item.name);
  }
  public loadData() {
    this.exampleDatabase = new RememberService(this.httpClient);
    this.dataSource = new CustomRemberDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}
