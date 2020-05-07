import { MemberService } from './../../services/member.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-member.dialog',
  templateUrl: '../../dialogs/edit-member/edit-member.dialog.html',
  styleUrls: ['../../dialogs/edit-member/edit-member.dialog.scss']
})
export class EditMemberDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: MemberService) { }

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
