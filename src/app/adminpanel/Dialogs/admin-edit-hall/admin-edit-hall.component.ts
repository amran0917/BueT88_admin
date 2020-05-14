import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyService } from 'src/app/services/my.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-edit-hall',
  templateUrl: './admin-edit-hall.component.html',
  styleUrls: ['./admin-edit-hall.component.scss']
})
export class AdminEditHallComponent implements OnInit {

  hallgroup: any;
  id: any;
  data: any;
  data2: any;
  constructor(private router: Router, private snack: MatSnackBar,
              private fb: FormBuilder, private service: MyService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.getId();
    this.loadData();
  }

  createForm() {
    this.hallgroup = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onClick() {
    this.router.navigate(['/admin']);
    }
  Submit() {
    this.data2 = {code: this.data.code, name: this.hallgroup.get('name').value};
    // console.log(this.data2);
    // console.log(this.data.code);
    // console.log(this.hallgroup.value);
    this.service.updateData('club/halls/update/' + this.data.code, this.hallgroup.value).subscribe(
      (res) => {
        this.snack.open('Successfully Edited ', '' , {
          duration: 1000,
        });
        this.router.navigate(['/admin']);
      }
    );

  }

  getId() {
    this.route.params.subscribe((res) => {
      this.id = res.id;
    });
  }
  loadData() {

    this.service.getData('club/halls/' + this.id).subscribe((res) => {
       this.data = res;
       this.setForm();

    });
  }

  setForm() {
    this.hallgroup.setValue({name: this.data.name});

  }
}
