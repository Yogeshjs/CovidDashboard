import { Component, OnInit } from '@angular/core';
import { CovidService } from "../covid.service";
import { Sort } from '@angular/material/sort';


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

interface State {
          state : string;
          confirmed: string;
				  active: string;
				  recovered: string;
          deaths: string;
          district: any;
          showToggle: boolean;
          rotateClass: boolean;
}


@Component({
  selector: 'app-state-table',
  templateUrl: './state-table.component.html',
  styleUrls: ['./state-table.component.css']
})
export class StateTableComponent implements OnInit {

  stateWise = [];
  states:State[] = []; 
  STATES:State[] = [];
  stateDistrict;
  //showToggle : boolean = false;

  constructor(private covid: CovidService) {
    
   }

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
          const obj : State = {
            state : '',
            confirmed: '',
            active: '',
            recovered: '',
            deaths: '',
            district: [],
            showToggle: false,
            rotateClass: false
          };
          obj['state'] = elm.state;
          obj['confirmed'] = elm.confirmed ;
				  obj['active'] = elm.active;
				  obj['recovered'] = elm.recovered;
          obj['deaths'] = elm.deaths;
          obj['district'] = this.getDistrictWiseData(districtData, elm.state);
          obj['showToggle'] = false;
          obj['rotateClass'] = false;

          this.STATES.push(obj);
          
      }
    });

    this.states = this.STATES.slice();
    console.log("state and district",this.states);
  }

  onDistrictClick(index){
    //this.stateDistrict = data;
    //console.log("show toggle", index);
    this.states[index].showToggle = !this.states[index].showToggle;
    this.states[index].rotateClass = !this.states[index].rotateClass;
  }

  sortState(sort: Sort){
    const data = this.STATES.slice();
    if(!sort.active || sort.direction === ''){
        this.states = data;
        return;
    }

    this.states = data.sort((a,b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active){
          case 'state' : return compare(a.state, b.state, isAsc);
          case 'confirmed' : return compare(parseInt(a.confirmed), parseInt(b.confirmed), isAsc);
          case 'active' : return compare(parseInt(a.active), parseInt(b.active), isAsc);
          case 'recovered' : return compare(parseInt(a.recovered), parseInt(b.recovered), isAsc);
          case 'deaths' : return compare(parseInt(a.deaths), parseInt(b.deaths), isAsc);
          default: return 0;
        }
    })
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

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
