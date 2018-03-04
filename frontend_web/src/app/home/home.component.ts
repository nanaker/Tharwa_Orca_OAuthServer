import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ChartistModule } from 'ng-chartist';
import { AppComponent} from '../../app/app.component';
import {LogComponent} from '../../log/log.component';


import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  selectedTab : number
  displayBlur : String;
  ngOnInit() 
  {
    if(this.getBlurState() === false){
      this.displayBlur = "none";  
    }
  }

  deleteBlur()
  {
    LogComponent.blur = false;
    localStorage.setItem('blur','false');
    this.displayBlur = "none";
  }

  getBlurState()
  {
    if (localStorage.getItem('blur')==='true'){
      
      alert(localStorage.getItem('blur'));
      return true;

    }else
    {
      return false;
    }
  }


}
