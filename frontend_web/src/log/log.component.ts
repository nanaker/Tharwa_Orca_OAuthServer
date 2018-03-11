import { Component } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
 
import { AppModule } from '../app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@Component({
  selector: 'log-root',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {
  title = 'app';
  constructor(private httpClient:HttpClient){}
  static blur : boolean;
  ngOnInit(){
   
  }


}
