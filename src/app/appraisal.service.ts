import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'text/plain',
    'Accept': '*/*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AppraisalService {

  constructor(private http: HttpClient) { }

  totals;
  buy;

  getAppraisal(raw:String) {
    return this.http.get(raw + ".json");
  } 
}
