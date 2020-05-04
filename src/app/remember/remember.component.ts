import { Remember } from './../interface/Remember.interface';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.scss']
})
export class RememberComponent implements OnInit, AfterViewInit {

  public displayedColumns: any;
    public datasource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  memberConfigs = [
    {name: 'Name'},
    {name: 'Member_Added_On'},
    {name: 'Department'},
    {name: 'Hall'},
    {name: 'Action'}
  ];

  data: Remember[] = [
    {  Name: 'A K M Khairul Alam', Department : 'Architecture', Hall: 'Nazrul islam hall',  Member_Added_On: '5/4/2012'},
    {  Name: 'A K M Mahfuel Alam', Department: 'Civil',  Hall: 'Shere bangla hall', Member_Added_On: '5/5/2013'},
    {  Name: 'MainulA K M Fazlul Haque', Department: 'CSE', Hall: 'Shorowardi hall', Member_Added_On: '6/7/2014'},
    { Name: 'Shohag', Department: 'EEE',  Hall: 'Titumir  hall', Member_Added_On: '10/5/2015'},
    {  Name: 'Liton', Department: 'Mechanical',  Hall: 'ahsan ullah hall', Member_Added_On: '8/7/2016'},
    { Name: 'Anisul', Department: 'Mechanical',  Hall: 'Nazrul islam hall', Member_Added_On: '6/7/2017'},
    {Name: 'Fahad', Department: 'ECE',  Hall: 'titumir hall', Member_Added_On: '7/7/2018'},
    {  Name: 'Bawka', Department: 'Architecture', Hall: 'Nazrul islam hall', Member_Added_On: '8/8/2019'},
    { Name: 'Hanif', Department: 'WaterAndResource', Hall: 'sher e bangla hall', Member_Added_On: '9/10/2019'}
  ];
  constructor() { }

  ngOnInit(): void {

      this.getmemberConfigCall();
      this.datasource = new MatTableDataSource<Remember>(this.data);
      this.datasource.paginator = this.paginator;

  }
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

  public  getmemberConfigCall(): any {
    this.displayedColumns = this.memberConfigs.map(item  => item.name);
  }

}
