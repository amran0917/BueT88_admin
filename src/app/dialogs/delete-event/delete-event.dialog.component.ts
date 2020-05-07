import { MemberService } from './../../services/member.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-delete-event.dialog',
  templateUrl: '../../dialogs/delete-event/delete-event.dialog.html',
  styleUrls: ['../../dialogs/delete-event/delete-event.dialog.css']
})
export class DeleteEventDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: EventService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.Id);
  }
}
