import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { ChartsModule } from 'ng2-charts'
import { MatSortModule } from "@angular/material/sort";

import { CovidService } from "./covid.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaseIndicatorComponent } from './case-indicator/case-indicator.component';
import { StateTableComponent } from './state-table/state-table.component';
import { DistrictTableComponent } from './district-table/district-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CumulativeChartComponent } from './cumulative-chart/cumulative-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    CaseIndicatorComponent,
    StateTableComponent,
    DistrictTableComponent,
    CumulativeChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule
   
  ],
  providers: [CovidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
