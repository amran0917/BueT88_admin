import { DeleteDialogComponent } from './../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './../dialogs/edit/edit.dialog.component';
import { WorkService } from './../services/work.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { ExampleDataSource } from './ExampleDataSource';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit, AfterViewInit, OnChanges {

    public displayedColumns: any;
    public datasource: any;
    exampleDatabase: WorkService | null;
    dataSource: ExampleDataSource | null;
    index: number;
   Id: number;


    public config: any;

    public dummydata: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;


  // demo: AddHall[] = [
  //   {Position: '1', Name: 'Ahsanullah Hall', AddedOn: '04/10/2013'},
  //   {Position: '2', Name: 'Ladies Hall', AddedOn: '04/10/2014'},
  //   {Position: '3', Name: 'Nazrul Islam Hall', AddedOn: '05/10/2014'},
  //   {Position: '4', Name: 'Shahid Smiriti Hall', AddedOn: '04/12/2017'},
  //   {Position: '5', Name: 'Shorowardi hall', AddedOn: '04/10/2019'}

  // ];


  memberConfigs = [
    {name: 'code'},
    {name: 'name'},
    {name: 'Action'}
  ];

  // dataSource: MatTableDataSource<any>;
  constructor(private dialog: MatDialog, public httpClient: HttpClient, private dataService: WorkService) { }

  ngOnInit(): void {
       this.getmemberConfigCall();
      //  this.datasource = new MatTableDataSource<AddHall>(this.demo);
      //  this.getDataCall();
      //  this.datasource.paginator = this.paginator;
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
    // this.dataService.getCofig() .subscribe((res) => {
    //   this.config = res;
    //   this.displayedColumns = this.config.map(item => item.name);

    // });
  }

  public getDataCall(): any {

    this.dataService.getData().subscribe((res) => {
      this.dummydata = res;
   //   this.dataSource = new MatTableDataSource(this.dummydata);
      this.dataSource.paginator = this.paginator;


    });



  }
  onAddRow() {
  //   // const mas = {Position: 6, Name: 'Bidroyihall', AddedOn: '7/7/20202'};
    // this.demo.push(mas);
    // this.datasource.data = this.demo;
    // // a.log(this.datasource);
    // this.datasource._updateChangeSubscription();

    const dialogRef = this.dialog.open(AddDialogComponent, {
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
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {Id: rowOb.Id, Name: rowOb.Name, AddedOn: rowOb.AddedOn}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.code === this.Id);
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  OnDelete(rowOb: any, i: number) {
    this.index = i;
    this.Id = rowOb.Id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {Id: rowOb.Id, Name: rowOb.Name, AddedOn: rowOb.AddedOn}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.code === this.Id);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
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
  public loadData() {
    this.exampleDatabase = new WorkService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
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

  // filtering material
  public applyFilter(filterValue: string): any {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

