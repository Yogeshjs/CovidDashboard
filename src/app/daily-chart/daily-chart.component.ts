import { Component, OnInit } from '@angular/core';
import { CovidService } from "../covid.service";

interface ModelData{
  confirmed: object;
  active: object;
  recovered: object;
  deceased: object;
}

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.css']
})
export class DailyChartComponent implements OnInit {

  stateChartData: ModelData = {
    confirmed:{},
    active:{},
    recovered:{},
    deceased:{}
  };

  stateChartDates = [];

  statesCode = [];

  stateCode = 'an';


  public barChartOptions = {
    responsive: true
  };

  confirmedChartData = [{
    label: '# Case',
    data:[],
    fill: true,
    backgroundColor:'#dc3545',
    borderColor: '#dc3545',
    borderWidth: 2,
    pointBackgroundColor: '#dc3545',
    pointBorderColor: '#dc3545',
    pointRadius: 0
  }];

  activeChartData = [{
    label: '# Case',
    data:[],
    fill: true,
    backgroundColor:'#dc3545',
    borderColor: '#dc3545',
    borderWidth: 2,
    pointBackgroundColor: '#dc3545',
    pointBorderColor: '#dc3545',
    pointRadius: 0
  }];

  recoveredChartData = [{
    label: '# Case',
    data:[],
    fill: true,
    backgroundColor:'#dc3545',
    borderColor: '#dc3545',
    borderWidth: 2,
    pointBackgroundColor: '#dc3545',
    pointBorderColor: '#dc3545',
    pointRadius: 0
  }];

  deceasedChartData = [{
    label: '# Case',
    data:[],
    fill: true,
    backgroundColor:'#dc3545',
    borderColor: '#dc3545',
    borderWidth: 2,
    pointBackgroundColor: '#dc3545',
    pointBorderColor: '#dc3545',
    pointRadius: 0
  }];

  ChartLabels = [];

  ChartOptions = {
    legend: {
      display: true
    },
          scales: {
        xAxes: [{
          gridLines: {
            display:false
        }
          }],
              yAxes: [{
                gridLines: {
                  display:false
              },
      type: 'linear',
      stacked: true,
                  ticks: {
                      beginAtZero: true
                  }
              }],

          }
    };

  ChartLegend = true;

  ChartType = 'bar';

  createChart(){
    // confirmed chart
    this.confirmedChartData = [{
      label: '# Confirmed',
      data: this.stateChartData.confirmed[this.stateCode],
      fill: true,
      backgroundColor:'#dc3545',
      borderColor: '#dc3545',
      borderWidth: 2,
      pointBackgroundColor: '#dc3545',
      pointBorderColor: '#dc3545',
      pointRadius: 1
    }];
  
    this.ChartLabels = this.stateChartDates;
  
    //active chart
    this.activeChartData = [{
      label: '# Active',
      data:this.stateChartData.active[this.stateCode],
      fill: true,
      backgroundColor:'#007bff',
      borderColor: '#007bff',
      borderWidth: 2,
      pointBackgroundColor: '#007bff',
      pointBorderColor: '#007bff',
      pointRadius: 1
    }];

    //recovered chart
    this.recoveredChartData = [{
      label: '# Recovered',
      data:this.stateChartData.recovered[this.stateCode],
      fill: true,
      backgroundColor:'#28a745',
      borderColor: '#28a745',
      borderWidth: 2,
      pointBackgroundColor: '#28a745',
      pointBorderColor: '#28a745',
      pointRadius: 1
    }];
  
   //deceased chart
   this.deceasedChartData = [{
      label: '# Deceased',
      data:this.stateChartData.deceased[this.stateCode],
      fill: true,
      backgroundColor:'#6c757d',
      borderColor: '#6c757d',
      borderWidth: 2,
      pointBackgroundColor: '#6c757d',
      pointBorderColor: '#6c757d',
      pointRadius: 1
    }];

  }

  constructor(private covid: CovidService) { }

  dataStructure(data){
    const obj:ModelData = {
      confirmed:{},
      active:{},
      recovered:{},
      deceased:{}
    };
    const confirmed = {};
    const active = {};
    const recovered = {};
    const deceased = {};
    
    const keys = Object.keys(data.states_daily[0]).filter((elm)=>{ return elm.length === 2});
  
    keys.forEach((elm, index)=>{
      confirmed[elm] = [];
      active[elm] = [];
      recovered[elm] = [];
      deceased[elm] = [];
    });
    
    obj['confirmed'] = confirmed;
    obj['active'] = active;
    obj['recovered'] = recovered;
    obj['deceased']	= deceased;
  
    return obj;
  }

  dailyStateData(data){
	  let confirmed = 0;
	  let recovered = 0;
	  let deceased = 0;
    let dailyDates = [];
    const dataModel: ModelData = this.dataStructure(data);

    data.states_daily.forEach((elm, index)=>{
			if(elm.status === "Confirmed"){
				for(const key in elm){
					
					if(key === 'date'){
						dailyDates.push(elm[key]);
						continue;
					}
					
					if(key === 'status'){

						continue;
					}
					confirmed = parseInt(elm[key]);
					dataModel.confirmed[key].push(confirmed);
				}
			
			}else if(elm.status === "Recovered"){
				for(const key in elm){
					if(key === 'status' || key === 'date'){
						continue;	
					}
					recovered = parseInt(elm[key]);
					dataModel.recovered[key].push(recovered);
				}
								
			}else if(elm.status === "Deceased"){
				for(const key in elm){
					if(key === 'status' || key === 'date'){
						continue;
					}
					deceased = parseInt(elm[key]);
					dataModel.deceased[key].push(deceased);
					dataModel.active[key].push(Math.abs(confirmed - recovered - deceased));
				}

			}

      //console.log(elm);
      
      
    })

  
    
    this.stateChartData = dataModel;
    this.stateChartDates = dailyDates;
    //console.log(this.stateChartData.confirmed['mh']);
    //console.log(this.stateChartDates);
  }

  stateCodes(data){
    for(const key in data){
			

			const obj = {};
			obj['statename'] = key;
			obj['statecode'] = data[key].statecode;
			this.statesCode.push(obj);
		}

  }

  changeSateCode(selectSate){
    this.stateCode = selectSate;
    this.createChart();
  }

  ngOnInit(): void {
    this.covid.getStateChartData()
      .subscribe(data => {
        this.dailyStateData(data);
      },
      err =>{
        console.log(err)
      },
      ()=>{
        this.createChart();
      });

      this.covid.getDistrictData()
      .subscribe(data => {
        this.stateCodes(data);
      });
  }

}
