import { MemberService } from './../services/member.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { CustomDataSource } from './CustomDataSource';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit, AfterViewInit, OnChanges {


  public displayedColumns: any;
  public datasource: any;
  exampleDatabase: MemberService | null;
  dataSource: CustomDataSource | null;
  index: number;
 Id: number;


  public config: any;

  public dummydata: any;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild('filter',  {static: true}) filter: ElementRef;

memberConfigs = [
    {name: 'Id'},
    {name: 'Image'},
    {name: 'Name'},
    {name: 'MemberAddedOn'},
    {name: 'Action'}
  ];
  constructor(private dialog: MatDialog, public httpClient: HttpClient, private dataService: MemberService) { }

  ngOnInit(): void {
    this.getmemberConfigCall();
    this.loadData();


}
refresh() {
  this.loadData();
}


ngAfterViewInit(): void {
}

ngOnChanges(): void {
}
public  getmemberConfigCall(): any {
  this.displayedColumns = this.memberConfigs.map(item  => item.name);
}

public loadData() {
  this.exampleDatabase = new MemberService(this.httpClient);
  this.dataSource = new CustomDataSource(this.exampleDatabase, this.paginator, this.sort);
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
