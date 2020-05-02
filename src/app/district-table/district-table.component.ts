import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-district-table',
  templateUrl: './district-table.component.html',
  styleUrls: ['./district-table.component.css']
})
export class DistrictTableComponent implements OnInit {

  @Input() districts;
  constructor() { }

  ngOnInit(): void {
  }

}
