import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { MyService } from 'src/app/services/my.service';

@Component({
  selector: 'app-admin-update-dept',
  templateUrl: './admin-update-dept.component.html',
  styleUrls: ['./admin-update-dept.component.scss']
})
export class AdminUpdateDeptComponent implements OnInit {

  deptgroup: any;
  id: any;
  data: any;
  constructor(private router: Router, private snack: MatSnackBar,
              private fb: FormBuilder, private service: MyService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.getId();
    this.loadData();
  }

  createForm() {
    this.deptgroup = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onClick() {
    this.router.navigate(['/admin/department']);
  }

  Submit() {
    this.service.updateData('club/departments/update/' + this.data.code, this.deptgroup.value).subscribe(
      (res) => {
        this.snack.open('Successfully Edited ', '' , {
          duration: 1000,
        });
        this.router.navigate(['/admin/department']);
      }
    );
  }
  getId() {
    this.route.params.subscribe((res) => {
      this.id = res.id;
    });
  }
  loadData() {

    this.service.getData('club/departments/' + this.id).subscribe((res) => {
       this.data = res;
       this.setForm();

    });
  }

  setForm() {
    this.deptgroup.setValue({name: this.data.name});

  }

}
