import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ChartistModule } from 'ng-chartist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  selectedTab : number
  
  ngOnInit() 
  {
  }



}
