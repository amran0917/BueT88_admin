import { Component, OnInit } from '@angular/core';
import { Demo } from '../interface/demo.interface';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {


  data: Demo[] = [
    { Name: 'Kamarujumman', Department : 'Architecture', Hall: 'Nazrul islam hall'},
    { Name: 'Hamidur', Department: 'Civil',  Hall: 'Shere bangla hall'},
    { Name: 'Mainul', Department: 'CSE', Hall: 'Shorowardi hall'},
    { Name: 'Shohag', Department: 'EEE',  Hall: 'Titumir  hall'},
    { Name: 'Liton', Department: 'Mechanical',  Hall: 'ahsan ullah hall'},
    { Name: 'Anisul', Department: 'Mechanical',  Hall: 'Nazrul islam hall'},
    { Name: 'Fahad', Department: 'ECE',  Hall: 'titumir hall'},
    { Name: 'Bawka', Department: 'Architecture', Hall: 'Nazrul islam hall'},
    { Name: 'Hanif', Department: 'WaterAndResource', Hall: 'sher e bangla hall'}
  ];

 
  constructor() {
    
   }

  ngOnInit(): void {
  }

}
