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
  
//fonction retourne si oui ou non le token actuel est valide
  getTokenInfo(token_access:String)
  {
    var alive : Boolean = false;
    var headers = new HttpHeaders();
    headers = headers.append("Authorization","Bearer "+token_access+"");
    
    return this.httpClient.get("https://auththarwa.cleverapps.io/oauth/info",{headers:headers});
  }

  public verifToken(){
    

      var valide = this.getTokenInfo(localStorage.getItem('token_access'));

      valide.subscribe(data=>
      {
        console.log(data);
      }
      ,err =>
      {
        var headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append("Authorization","Basic Y2xpZW50d2ViOm9yY2FAMjAxOA==");    
        
        const body="grant_type=refresh_token&refresh_token=" + localStorage.getItem('refresh') + "" ;
        

        this.httpClient.post('https://auththarwa.cleverapps.io/oauth/refresh',body, {headers: headers})
        .subscribe(response => 
          {
            
            console.log(response);
    
            
            localStorage.setItem('token_access',response["access_token"]);

            var expire = response["expires_in"];
            expire = expire * 1000 + Date.now();
    
            localStorage.setItem('expire',expire);
          }
          ,err => {
              console.log(err);      
              this.router.navigateByUrl('/');
          }
        );
      }
    );

  }


  ngOnInit()
  {
  }


  



}