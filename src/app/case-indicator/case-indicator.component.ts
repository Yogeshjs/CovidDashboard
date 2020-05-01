import { Component, OnInit } from '@angular/core';
import { CovidService } from "../covid.service";



@Component({
  selector: 'app-case-indicator',
  templateUrl: './case-indicator.component.html',
  styleUrls: ['./case-indicator.component.css']
})
export class CaseIndicatorComponent implements OnInit {

  confirmed:string;
  deltaConfirm:string;
  active:string;
  recovered:string;
  deltaRecovery:string;
  deaths:string;
  deltaDeaths:string;

  constructor(private covid: CovidService) { }

  ngOnInit(): void {
      this.covid.getCaseData()
      .subscribe(data =>{
        this.confirmed =  data.statewise[0].confirmed;
          this.deltaConfirm = data.statewise[0].deltaconfirmed;
          this.active = data.statewise[0].active;
          this.recovered = data.statewise[0].recovered;
          this.deltaRecovery = data.statewise[0].deltarecovered;
          this.deaths = data.statewise[0].deaths;
          this.deltaDeaths = data.statewise[0].deltadeaths;
      });
  }

}
