import { Component, OnInit } from '@angular/core';
import { LogComponent } from '../log.component';

import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient:HttpClient,private router: Router) { }
  
  mail:String;
  mdp :String;
  ngOnInit() {
    var millis = Date.now();
    
    var expireTime = +localStorage.getItem('expire');
    if ( ( millis - expireTime ) > 0 )
    {
      //this.router.navigateByUrl('/gestionnaire');
    }
  }
  
  
  tryAuth(){
    this.authentifier( this.mail, this.mdp );
  }



  authentifier( userMail:String, pass:String )
  {
    var headers = new HttpHeaders();
    
    
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("Authorization","Basic Y2xpZW50d2ViOm9yY2FAMjAxOA==");    
    


    const body="grant_type=password&username=" + userMail + "&password=" + pass + "";



    this.httpClient.post('http://auththarwa.cleverapps.io/oauth/login',body, {headers: headers})
    .subscribe(response => 
      {
        console.log(response);

        localStorage.setItem('blur','true');
        localStorage.setItem('token_access',response["access_token"]);
        localStorage.setItem('code',response["code"]);
        localStorage.setItem('auth','true');
        localStorage.setItem('refresh',response["refresh_token"]);
        var expire = response["expires_in"];
        expire = expire * 1000 + Date.now();
        localStorage.setItem('expire',expire);
        
        this.router.navigateByUrl('/gestionnaire');

      }
      ,err => {
        if(err["status"]===403)
        {
          alert("E-mail ou mot de passe incorrecte");
        }
        else if (err["status"]>= 500)
        {
          alert("oups il y a un soucis de la prt de notre serveur :'(");
        }
        console.log(err);
        console.log("User authentication failed!");
      }
    );
  }
}
