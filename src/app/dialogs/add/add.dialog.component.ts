import { AddHall } from './../../interface/AddHall.interface';
import { WorkService } from './../../services/work.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {

  formDialog: any;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddHall,
              public dataService: WorkService, private fb: FormBuilder) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOninit(): void {

  // this.formDialog = this.fb.group({
  // Position: [''],
  // Name: [''],
  // Added: ['']
  // });
}
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    console.log(this.formControl.value);
  }
  onSubmit() {
    console.log(this.formDialog.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): any {

    // var myObj = _.toPlainObject(this.data);

   this.dataService.addIssue(this.data);

  }
}
