import { AddEvent } from './../interface/AddEvent.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = 'https://localhost:44342/';
  public dialogData: any;
  dataChange: BehaviorSubject<AddEvent[]> = new BehaviorSubject<AddEvent[]>([]);

  constructor(private http: HttpClient) { }

  get data(): AddEvent[] {
    return this.dataChange.value;

  }
  getDialogData() {
    return this.dialogData;
  }

  addIssue(issue: AddEvent): void {
    console.log(issue);
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
  updateIssue(issue: AddEvent): void {
    this.dialogData = issue;
    this.http.put(this.url + 'api/events' + issue.Id, issue).subscribe();
  }

  deleteIssue(id: number): void {
    console.log('Deleted' + id);
    this.http.delete(this.url + 'api/events' + id, {headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')}).subscribe();
  }

  getAllIssues(): any {
    this.http.get<any>(this.url + 'api/events').subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
    }

}


