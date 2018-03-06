import { Component } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { LogComponent } from '../log/log.component';

import { Router } from '@angular/router';

@Component(
  {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}
)
export class AppComponent {
  
  
  title = 'app';
  constructor(private httpClient:HttpClient, private router: Router){}
  
  public verifToken(){
    var millis = Date.now();
    var expireTime = 0;
    var expireTime = +localStorage.getItem('expire');
  
    if ( ( millis - expireTime ) >= 0 )
    {
      
      
      var headers = new HttpHeaders();
      headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
      headers = headers.append("Authorization","Basic Y2xpZW50d2ViOm9yY2FAMjAxOA==");    
      
      const body="grant_type=refresh_token&refresh_token=" + localStorage.getItem('refresh') + "" ;


      this.httpClient.post('http://auththarwa.cleverapps.io/oauth/login',body, {headers: headers})
      .subscribe(response => 
        {
          console.log(response);
  
          
          localStorage.setItem('token_access',response["access_token"]);
          localStorage.setItem('auth','true');
          localStorage.setItem('refresh',response["refresh_token"]);
          var expire = response["expires_in"] + Date.now();
  
          localStorage.setItem('expire',expire);
          alert("pas de redirection");
        }
        ,err => {
          
            this.router.navigateByUrl('http://localhost:4200');
            alert("redirection à home");
          
        }
      );
    } 
  }


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