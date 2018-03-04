import { Component } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';


import { NgModule } from '@angular/core';
import { LogComponent } from '../log/log.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private httpClient:HttpClient){}
  
  


  ngOnInit()
  {
    
  }


  

  getProfile()
  {
    this.httpClient.get('http://127.0.0.1:8080/page')
    .subscribe(
      (data:any[]) =>
      {
        console.log(data["name"]);
      }
    )
  }

}