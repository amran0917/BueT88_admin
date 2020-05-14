import { Router } from '@angular/router';
import { MyService } from './../../../services/my.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-add-hall',
  templateUrl: './admin-add-hall.component.html',
  styleUrls: ['./admin-add-hall.component.scss']
})
export class AdminAddHallComponent implements OnInit {

  hallgroup: any;
  constructor(private router: Router, private snack: MatSnackBar, private fb: FormBuilder, private service: MyService) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.hallgroup = this.fb.group({
      name:['', Validators.required]
    });
  }

  onSubmit()
  {
    console.log(this.hallgroup);
    this.service.addData('club/halls/create', this.hallgroup.value).subscribe(
      (res) =>{
        this.snack.open('Successfully Added ', '' , {
          duration: 1000,
        });
        this.router.navigate(['/admin']);
      }
    );

  }

  onClick() {
    this.router.navigate(['/admin']);
    }

}
