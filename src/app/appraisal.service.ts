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
    // return raw;
    return this.http.get(raw+".json");




    // return this.http.post("https://evepraisal.com/appraisal.json?market=jita&raw_textarea=avatar&persist=no", "", httpOptions);  //should work, but CORS setting screws it up

   //return this.http.get('https://api.github.com/users/seeschweiler');

  } 
}
