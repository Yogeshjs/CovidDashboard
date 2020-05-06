import { Component, OnInit } from '@angular/core';
import { CovidService } from "../covid.service";

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

  dates: string[] = [];
  confirmedIndicator: string[] = [];
  activeIndicator: string[] =[];
  recoveredIndicator: string[] =[];
  deceasedIndicator: string[] =[];

  confirmedChartData = [{
                    label: '# Case',
                    data: this.confirmedIndicator,
                    fill: false,
                    borderColor: '#dc3545',
                    borderWidth: 2,
                    pointBackgroundColor: '#dc3545',
                    pointBorderColor: '#dc3545',
                    pointRadius: 0
                  }];
  activeChartData = [{
                    label: '# Case',
                    data: this.activeIndicator,
                    fill: false,
                    borderColor: '#007bff',
                    borderWidth: 2,
                    pointBackgroundColor: '#007bff',
                    pointBorderColor: '#007bff',
                    pointRadius: 0
                  }];
  recoveredChartData = [{
                    label: '# Case',
                    data: this.recoveredIndicator,
                    fill: false,
                    borderColor: '#28a745',
                    borderWidth: 2,
                    pointBackgroundColor: '#28a745',
                    pointBorderColor: '#28a745',
                    pointRadius: 0
                  }];
  deceasedChartData = [{
                    label: '# Case',
                    data: this.deceasedIndicator,
                    fill: false,
                    borderColor: '#6c757d',
                    borderWidth: 2,
                    pointBackgroundColor: '#6c757d',
                    pointBorderColor: '#6c757d',
                    pointRadius: 0
                  }];

ChartOptions = {
  legend: {
		display: false
	},
        scales: {
	    xAxes: [{
		display: false
        }],
            yAxes: [{
		type: 'linear',
		display: false,
		stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }],

	    gridLines: {
		display: false,
		color: 'red'
	    }
        }
    };

ChartLegend = false;

ChartType = 'line';

  constructor(private covid: CovidService) { }

  getTotalConfirmed(data:caseData){

      let active = 0;
      data.cases_time_series.forEach((elm, index)=>{
          if(index >= 50){
              this.dates.push(elm.date);
              this.confirmedIndicator.push(elm.dailyconfirmed);
              active = parseInt(elm.dailyconfirmed) - parseInt(elm.dailyrecovered) - parseInt(elm.dailydeceased);
              this.activeIndicator.push(active.toString());
              this.recoveredIndicator.push(elm.dailyrecovered);
              this.deceasedIndicator.push(elm.totaldeceased);
          }
      })


  }

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

          this.getTotalConfirmed(data);
      });
  }

}
