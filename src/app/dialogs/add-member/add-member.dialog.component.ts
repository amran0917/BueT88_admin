import { MemberService } from './../../services/member.service';
import { AddMember } from './../../interface/AddMember.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, ViewChild, ElementRef} from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-member.dialog',
  templateUrl: '../../dialogs/add-member/add-member.dialog.html',
  styleUrls: ['../../dialogs/add-member/add-member.dialog.css']
})

export class AddMemberDialogComponent {

  formDialog: any;
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files  = [];

  constructor(public dialogRef: MatDialogRef<AddMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddMember,
              public dataService: MemberService, private fb: FormBuilder) { }

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
   this.dataService.addIssue(this.data);

  }
  /* for file upload */
//   uploadFile(file) {

//     const formData = new FormData();
//     formData.append('file', file.data);
//     file.inProgress = true;
//     this.dataService.upload(formData).pipe(
//       map(event => {
//         switch (event.type) {
//           case HttpEventType.UploadProgress:
//             file.progress = Math.round(event.loaded * 100 / event.total);
//             break;
//           case HttpEventType.Response:
//             return event;
//         }
//       }),
//       catchError((error: HttpErrorResponse) => {
//         file.inProgress = false;
//         return of(`${file.data.name} upload failed.`);
//       })).subscribe((event: any) => {
//         if (typeof (event) === 'object') {
//           console.log(event.body);
//         }
//       });
//   }
//   private uploadFiles() {
//     this.fileUpload.nativeElement.value = '';
//     this.files.forEach(file => {
//       this.uploadFile(file);
//     });
// }

//   onClick() {
//     console.log ('Something ERROR!');
//     const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
//     // tslint:disable-next-line: prefer-for-of
//     for (let index = 0; index < fileUpload.files.length; index++) {
//      const file = fileUpload.files[index];
//      this.files.push({ data: file, inProgress: false, progress: 0});
//     }
//     this.uploadFiles();
//     };
//     fileUpload.click();
// }

}
