import { AddHall } from './../interface/AddHall.interface';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  action: string;
  localData: any;
 
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AddHall) {
    console.log(data);
    this.localData = {...data};
    this.action = this.localData.action;
  }
 
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData});
  }
 
  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
  ngOnInit(): void {
  }

}
