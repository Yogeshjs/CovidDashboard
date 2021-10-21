import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface DailyData{
  dailyconfirmed: string;
  dailydeceased: string;
  dailyrecovered: string;
  date: string;
  totalconfirmed: string;
  totaldeceased: string;
  totalrecovered: string;
}

interface caseData {

  cases_time_series: DailyData[];
  
  statewise: Array<{
    confirmed:string, 
    deltaconfirmed:string, 
    active:string, 
    recovered:string, 
    deltarecovered:string, 
    deaths:string,
    deltadeaths:string,
    state:string}>
}


@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  // getCaseData(){
  //   return this.http.get<caseData>('https://api.covid19india.org/data.json');
  // }

  getCaseData(){
    return this.http.get<caseData>('../assets/data.json');
  }

  // getDistrictData(){
  //   return this.http.get('https://api.covid19india.org/state_district_wise.json');
  // }

  getDistrictData(){
    return this.http.get('../assets/state_district_wise.json');
  }

  // getStateChartData(){
  //   return this.http.get('https://api.covid19india.org/states_daily.json');
  // }

  getStateChartData(){
    return this.http.get('../assets/states_daily.json');
  }

}
