import { MyService } from './../../services/my.service';
import { DeleteDialogComponent } from './../../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './../../dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './../../dialogs/add/add.dialog.component';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';
import { ExampleDataSource } from './ExampleDataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-hall',
  templateUrl: './admin-hall.component.html',
  styleUrls: ['./admin-hall.component.scss']
})
export class AdminHallComponent implements OnInit,AfterViewInit {

  public displayedColumns: any;
    exampleDatabase: WorkService | null;
    // dataSource: ExampleDataSource | null;
    index: number;
   Id: number;


    public config: any;

    public dummydata: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  dataSource: MatTableDataSource<any>;
  halls: any;


 


  memberConfigs = [
    {name: 'code'},
    {name: 'name'},
    {name: 'Action'}
  ];

  
  public popoverTitle: string = "Do u want to Delete";
  public popoverMessage = "???";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  constructor(private router: Router,private route:ActivatedRoute,private dialog: MatDialog, public httpClient: HttpClient, private dataService: WorkService, private service: MyService) { }

  ngOnInit(): void {
       this.getmemberConfigCall();
       this.onData();
      // this.loadData();


  }
  refresh() {
   // this.loadData();
  }


  ngAfterViewInit(): void {
    // this.datasource.sort =  this.sort;
  }

  ngOnChanges(): void {
  }
  public  getmemberConfigCall(): any {
    this.displayedColumns = this.memberConfigs.map(item  => item.name);
  }


  public onData(){
    this.service.getData('club/halls').subscribe(  (res) => {
      this.halls = res;
      // console.log(res);
      this.dataSource = new MatTableDataSource(this.halls);
      this.dataSource.paginator = this.paginator;
    }
  );
  }


  public onDelete(id:any){
    this.confirmClicked = true;
    this.service.deleteData('club/halls/delete/'+id).subscribe(
      (res) =>{
        this.onData();
    }
    );
  }

  public onUpdate(id: any) {
    this.router.navigate(['update-hall',id],{relativeTo:this.route});
  }




  // onAddRow() {
  


  // filtering material
  public applyFilter(filterValue: string): any {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}




