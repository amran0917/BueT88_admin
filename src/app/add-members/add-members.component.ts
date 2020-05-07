import { EditMemberDialogComponent } from './../dialogs/edit-member/edit-member.dialog.component';
import { DeleteMemberDialogComponent } from './../dialogs/delete-member/delete-member.dialog.component';
import { MemberService } from './../services/member.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { CustomDataSource } from './CustomDataSource';
import { AddMemberDialogComponent } from '../dialogs/add-member/add-member.dialog.component';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit, AfterViewInit, OnChanges {


  public displayedColumns: any;
  exampleDatabase: MemberService | null;
  dataSource: CustomDataSource | null;
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

OnDelete(rowOb: any, i: number) {
  this.index = i;
  this.Id = rowOb.Id;
  const dialogRef = this.dialog.open(DeleteMemberDialogComponent, {
    data: {Id: rowOb.Id, Name: rowOb.Name, MemberAddedOn: rowOb.MemberAddedOn, Image: rowOb.Image, Department: rowOb.Department}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.Id === this.Id);
      this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
    }
  });

}

onAddRow() {

    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
        data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

       this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());

       this.refreshTable();
      }
    });

  }

  onEdit(rowOb: any, i: number) {
    this.Id = rowOb.Id;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditMemberDialogComponent, {
      data: {Id: rowOb.Id, Image: rowOb.Image, Name: rowOb.Name, MemberAddedOn: rowOb.MemberAddedOn, Department: rowOb.Department }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.Id === this.Id);
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

private refreshTable() {
  if (this.dataSource.paginator.hasNextPage()) {
    this.dataSource.paginator.nextPage();
    this.dataSource.paginator.previousPage();
    // in case we're on last page this if will tick
  } else if (this.dataSource.paginator.hasPreviousPage()) {
    this.dataSource.paginator.previousPage();
    this.dataSource.paginator.nextPage();
    // in all other cases including active filter we do it like this
  } else {
    this.dataSource.filter = '';
    this.dataSource.filter = this.filter.nativeElement.value;
  }
  // this.paginator._changePageSize(this.paginator.pageSize);
}

}
