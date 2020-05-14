import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { WorkService } from 'src/app/services/work.service';
import { MyService } from 'src/app/services/my.service';

@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.scss']
})
export class AdminDepartmentComponent implements OnInit {

  public displayedColumns: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  dataSource: MatTableDataSource<any>;
  dept: any;
  public popoverTitle = 'Are u want to delete?';
  public popoverMessage = 'Yup';
  public confirmClicked = false;
  public cancelClicked = false;
  memberConfigs = [
    {name: 'code'},
    {name: 'name'},
    {name: 'Action'}
  ];

  constructor(private router: Router, private route: ActivatedRoute, public httpClient: HttpClient, private service: MyService) { }

  ngOnInit(): void {
    this.getdeptConfigCall();
    this.onData();


  }

  public getdeptConfigCall() {
    this.displayedColumns = this.memberConfigs.map(item  => item.name);

  }
  public onData() {
    this.service.getData('club/departments').subscribe(  (res) => {
      this.dept = res;
      console.log(this.dept);
      this.dataSource = new MatTableDataSource(this.dept);
      this.dataSource.paginator = this.paginator;
    }
  );
  }

  public onDelete(id: any) {
    this.confirmClicked = true;
    this.service.deleteData('club/departments/delete/' + id).subscribe(
      (res) => {
        this.onData();
    }
    );
  }

  public onUpdate(id: any) {
    this.router.navigate(['update-dept', id], {relativeTo: this.route});
  }
  public applyFilter(filterValue: string): any {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
