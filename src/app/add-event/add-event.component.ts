import { UpdateEventDialogComponent } from './../dialogs/update-event/update-event.dialog.component';
import { AddEventDialogComponent } from './../dialogs/add-event/add-event.dialog.component';
import { DeleteEventDialogComponent } from './../dialogs/delete-event/delete-event.dialog.component';
import { EventService } from './../services/event.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { CustomEventDataSource } from './CustomEventDataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, AfterViewInit, OnChanges {

  public displayedColumns: any;
  exampleDatabase: EventService | null;
  dataSource: CustomEventDataSource | null;
  private index: number;
  public Id: number;


@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild('filter',  {static: true}) filter: ElementRef;
eventConfigs = [
  {name: 'Id'},
  {name: 'Image'},
  {name: 'Event'},
  {name: 'Date'},
  {name: 'Action'}
];
constructor(private dialog: MatDialog, public httpClient: HttpClient, private dataService: EventService) { }

ngOnInit(): void {
  this.geteventConfigCall();
  this.loadData();


}
refresh() {
this.loadData();
}


ngAfterViewInit(): void {
}

ngOnChanges(): void {
}
public  geteventConfigCall(): any {
this.displayedColumns = this.eventConfigs.map(item  => item.name);
}

public loadData() {
  this.exampleDatabase = new EventService(this.httpClient);
  this.dataSource = new CustomEventDataSource(this.exampleDatabase, this.paginator, this.sort);
  fromEvent(this.filter.nativeElement, 'keyup')
    .subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
}
onDelete(rowOb: any, i: any) {
  this.index = i;
  this.Id = rowOb.Id;
  const dialogRef = this.dialog.open(DeleteEventDialogComponent, {
    data: {Id: rowOb.Id, Event: rowOb.Event,  Image: rowOb.Image, Date: rowOb.Date}
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

  const dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: {}
  });


  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {

     this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());

     this.refreshTable();
    }
  });

}

OnEdit(rowOb: any, i: number) {
  this.Id = rowOb.Id;
  this.index = i;
  console.log(this.index);
  const dialogRef = this.dialog.open(UpdateEventDialogComponent, {
    data: {Id: rowOb.Id, Image: rowOb.Image, Event: rowOb.Event, Date: rowOb.Date }
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
