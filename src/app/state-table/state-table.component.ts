import { Component, OnInit } from '@angular/core';
import { CovidService } from "../covid.service";

interface caseData {
  
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


@Component({
  selector: 'app-state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.css']
})
export class StateTableComponent implements OnInit {

  stateWise = [];
  states = [];
  stateDistrict;

  constructor(private covid: CovidService) { }

  getDistrictWiseData(distData:any, state:string){

    

      const districtWise =[];

      if(distData[state]){
        for( const key in distData[state].districtData ){
          const obj = {};
          obj['name'] = key;
          obj['confirmed'] = distData[state].districtData[key].confirmed;
          obj['active'] = distData[state].districtData[key].active;
          obj['recovered'] = distData[state].districtData[key].recovered;
          obj['deaths'] = distData[state].districtData[key].deceased;

          districtWise.push(obj);
        }

      }
      return districtWise;
  }

  getStateWiseData(stateData:caseData, districtData:any){

   // console.log(districtData);

    stateData.statewise.forEach((elm, index)=>{
      if(index > 0){
          const obj = {};
          obj['state'] = elm.state;
          obj['confirmed'] = elm.confirmed;
				  obj['active'] = elm.active;
				  obj['recovered'] = elm.recovered;
          obj['deaths'] = elm.deaths;
          obj['district'] = this.getDistrictWiseData(districtData, elm.state);

          this.states.push(obj);
      }
    });

    console.log("state and district",this.states);
  }

  onDistrictClick(data){
    this.stateDistrict = data;
  }

  ngOnInit(): void {
    this.covid.getCaseData()
    .subscribe(data => {
      this.stateWise = data.statewise;
      console.log(this.stateWise);

      this.covid.getDistrictData()
      .subscribe(districtData => {
        this.getStateWiseData(data, districtData);
      })
    });


  }

}
