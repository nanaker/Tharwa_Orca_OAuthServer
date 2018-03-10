import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { ChartistModule } from 'ng-chartist';
import { AppComponent} from '../../app/app.component';
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
    
    
  
    
    if(localStorage.getItem('blur') === "false")
    {
      appCompo.verifToken();
      this.displayBlur = "none";
    }

  }
  
  tryDeleteBlur()
  {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("Authorization","Basic Y2xpZW50d2ViOm9yY2FAMjAxOA==");
    

    var codeEnvoi = this.code[0] + "" + this.code[1]+""+this.code[2]+""+this.code[3]+""; // code à envoyer

    var  body = "grant_type=password&username="+localStorage.getItem('mail')+"&password="+codeEnvoi+"";

    

    //on envoie la requete au service pour vérifier le code
    this.httpClient.post('https://auththarwa.cleverapps.io/oauth/login',body,{headers:headers})
    .subscribe(responseToken =>
      //reponse donné par le serveur après avoir valider le code, elle contient l'access token
      {
        console.log(responseToken);

        this.deleteBlur();

        localStorage.setItem('token_access',responseToken["access_token"]);
        localStorage.setItem('refresh',responseToken["refresh_token"]);
        var expire = responseToken["expires_in"];
        expire = expire * 1000 + Date.now();
        localStorage.setItem('expire',expire);
/*
        //on envoie la requete pour vérifier le token reçu au service app
        this.httpClient.post('https://serveurApp',body)
        .subscribe(response =>  
          {
            // si le code est valide
            localStorage.setItem('blur','true');
            localStorage.setItem('token_access',response["access_token"]);
            localStorage.setItem('auth','true');
            localStorage.setItem('refresh',response["refresh_token"]);
            var expire = response["expires_in"];
            expire = expire * 1000 + Date.now();
            localStorage.setItem('expire',expire);
          });
*/

      }
    ,err =>
    {
      
    });


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