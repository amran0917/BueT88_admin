import { AddEvent } from './../../interface/AddEvent.interface';
import { EventService } from './../../services/event.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-event.dialog',
  templateUrl: '../../dialogs/add-event/add-event.dialog.html',
  styleUrls: ['../../dialogs/add-event/add-event.dialog.scss']
})

export class AddEventDialogComponent {

  formDialog: any;
  constructor(public dialogRef: MatDialogRef<AddEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddEvent,
              public dataService: EventService, private fb: FormBuilder) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOninit(): void {
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
