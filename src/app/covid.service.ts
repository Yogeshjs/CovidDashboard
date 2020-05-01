import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface caseData {
  case_time_series: Array<object>,
  statewise: Array<{
    confirmed:string, 
    deltaconfirmed:string, 
    active:string, 
    recovered:string, 
    deltarecovered:string, 
    deaths:string,
    deltadeaths:string}>,
  tested: Array<object>
}


@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  getCaseData(){
    return this.http.get<caseData>('https://api.covid19india.org/data.json');
  }

}
