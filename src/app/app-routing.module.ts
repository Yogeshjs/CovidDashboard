import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CumulativeChartComponent } from "./cumulative-chart/cumulative-chart.component";
import { DailyChartComponent } from "./daily-chart/daily-chart.component";


const routes: Routes = [
  {path:'cumulative-chart', component:CumulativeChartComponent},
  {path:'daily-chart', component:DailyChartComponent},
  {path:'**', component:CumulativeChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
