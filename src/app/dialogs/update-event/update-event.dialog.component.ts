import { EventService } from 'src/app/services/event.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-event.dialog',
  templateUrl: '../../dialogs/update-event/update-event.dialog.html',
  styleUrls: ['../../dialogs/update-event/update-event.dialog.scss']
})
export class UpdateEventDialogComponent {

  constructor(public dialogRef: MatDialogRef<UpdateEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: EventService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }
}
