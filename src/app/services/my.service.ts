import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddHall } from '../interface/AddHall.interface';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  private url = 'http://118.179.215.4:4567/' ;
  private dialogData: any;
  constructor(private http: HttpClient) { }

  getData( path: any): any {
    return this.http.get<any>(this.url + path);

  }

  getDialogData() {
    return this.dialogData;
  }

  addData(api: any, data: any): any {

      return this.http.post<any>(this.url + api, data);
    }

    deleteData(api: any) {
      return this.http.delete<any>(this.url + api);
    }

    updateData(api: any, data: any) {
      return this.http.put<any> (this.url + api,  data);
    }
}
