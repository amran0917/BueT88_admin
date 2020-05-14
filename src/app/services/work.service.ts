import { AddHall } from './../interface/AddHall.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class WorkService {
  private url = 'http://118.179.215.4:4567/club/halls' ;//'https://localhost:44342/api/values';

  private url2 = 'https://localhost:44342/api/configs';
  dataChange: BehaviorSubject<AddHall[]> = new BehaviorSubject<AddHall[]>([]);

  dialogData: any;
  constructor(private http: HttpClient)  { }

  get data(): AddHall[] {
    return this.dataChange.value;

  }

  getCofig(): any {
    return this.http.get<any>(this.url2);
  }

  getData(): any {
    return this.http.get<any>(this.url);
  }
  getDialogData() {
    return this.dialogData;
  }

  addIssue(issue: AddHall): void {

//     let  object = Object.assign({}, ... issue);
    this.dialogData = issue;
  }

// addIssue(kanbanItem: AddHall): void {
//   this.http.post(this.url, kanbanItem).subscribe(data => {
//     this.dialogData = kanbanItem;
//     // this.ToastrService.success('successfully aded');
//     },
//     (err: HttpErrorResponse) => {
//     // this.ToastrService.success('Error occurred. Details: ' + err.name + ' ' + err.message);
//   });
//  }
// UPDATE, PUT METHOD
// updateItem(item: AddHall): void {
//   this.http.put(this.url + item.Id, item).subscribe(data => {
//       this.dialogData = item;
//       this.toasterService.showToaster('Successfully edited', 3000);
//     },
//     (err: HttpErrorResponse) => {
//       this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
//     }
//   );
// }

// // DELETE METHOD
// deleteItem(id: number): void {
//   this.http.delete(this.url + id).subscribe(data => {
//     console.log(data['']);
//       this.toasterService.showToaster('Successfully deleted', 3000);
//     },
//     (err: HttpErrorResponse) => {
//       this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
//     }
//   );
// }
  updateIssue(issue: AddHall): void {
    this.dialogData = issue;
    this.http.put(this.url + issue.code, issue).subscribe();
  }

  deleteIssue(id: number): void {
    console.log('Deleted' + id);
    this.http.delete(this.url + id, {headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')}).subscribe();
  }

  getAllIssues(): any {
    this.http.get<any>(this.url).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
    }



}
