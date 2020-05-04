import { Hall } from './../interface/hall.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  selectForm: FormGroup;
  departments = ['Architecture', 'Chemical Engineering', 'Civil Engineering', 'Electrical and Electronic Engineering',
  ' Mechanical Engineering', 'Naval Architecture and Marine Engineering', 'Materials and Metallurgical Engineering'
    ];

    halls: Hall[] = [
      { code: '4', name: 'Ahsanullah Hall'},
      {code: '14', name: 'Ext. Ahsanullah Hall'},
      {code: '13', name: 'Ext. Ladies Hall'},
       {code: '11' , name : 'Ext. Nazrul Islam Hall'},
      { code:  '10', name: 'Ext. Shahid Smriti Hall'},
      {  code : '7', name: 'Ext. Sher e Bangla Hall'},
      {code: ' 8', name: 'Ext. Sohrawardi Hall'},
    {code: '5', name: 'Ext. Titumir Hall'},
    {code: '12', name: 'Ladies Hall'},
    {code: '15', name: 'Nazrul Islam Hall'},
    {code: '16', name: 'Shahid Smiriti Hall'},
    {code: '17', name: 'Sher e Bangla Hall'},
    {code: '18', name: 'Sohrawardi Hall'},
    {code: '19', name: 'Titumir Hall'}
  ];

  partner = ['Yes', 'No'];

  blood = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  country = ['USA','Uk', 'Italy','Canada','France','Germany','Afghanistan'];


  constructor(private fb: FormBuilder) {
    this.selectForm = this. fb.group({
        deptControl: [ 'Department'],
        hallControl: ['Hall'],
        partnerControl: ['Life Member'],
        bloodControl: ['Blood Group'],
        countryControl: ['Country']
    });
  }

  ngOnInit(): void {
  }

}
