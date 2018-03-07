import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ChartistModule } from 'ng-chartist';
import { AppComponent} from '../../app/app.component';
import { HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';


import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  code=[];
  constructor(private httpClient:HttpClient, private router: Router) {}
  selectedTab : number;
  displayBlur : String;
  ngOnInit() 
  {
    var appCompo=new AppComponent(this.httpClient, this.router);
    appCompo.verifToken();
    
    
    if(this.getBlurState() === false)
    {
      this.displayBlur = "none";
    }

  }
  
  tryDeleteBlur()
  {
    var codeEntree = this.code[0] +""+ this.code[1] +""+ this.code[2] +""+ this.code[3]; 
    if( (localStorage.getItem('code') === codeEntree ) || ( localStorage.getItem('code') === "ok") )
    {
      
      this.deleteBlur();
    }
  }

  deleteBlur()
  {
    localStorage.setItem('blur','false');
    this.displayBlur = "none";
  }

  getBlurState()
  {
    if (localStorage.getItem('blur')==='true'){

      return true;

    }
    else
    {

      return false;
    
    }
  }


}