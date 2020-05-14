import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberFormService {

  private url = 'https://localhost:44342/';


  constructor(private http: HttpClient) { }

  getLifePartner(s: any): any {
  //  console.log( this.http.get<any>(this.url + 'api/partner'));
   return this.http.get<any>(this.url + s);

  }
}
