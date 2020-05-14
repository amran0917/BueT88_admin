import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyService } from 'src/app/services/my.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-add-dept',
  templateUrl: './admin-add-dept.component.html',
  styleUrls: ['./admin-add-dept.component.scss']
})
export class AdminAddDeptComponent implements OnInit {

  deptgroup: any;
  constructor(private fb: FormBuilder, private service: MyService,
              private snack: MatSnackBar, private location: Location, private router: Router) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.deptgroup = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    // console.log(this.deptgroup);
    this.service.addData('club/departments/create', this.deptgroup.value).subscribe(
      (res) => {
        this.snack.open('Successfully Added ', '' , {
          duration: 2000,
        });
        this.router.navigate(['/admin/department']);
      }
    );

  }

  onClick() {
  this.router.navigate(['/admin/department']);
  }

}
