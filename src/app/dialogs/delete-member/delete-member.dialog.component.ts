import { MemberService } from './../../services/member.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';


@Component({
  selector: 'app-delete-member.dialog',
  templateUrl: '../../dialogs/delete-member/delete-member.dialog.html',
  styleUrls: ['../../dialogs/delete-member/delete-member.dialog.css']
})
export class DeleteMemberDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: MemberService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.Id);
  }
}
