
import { Injectable, OnInit } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders, HttpClientModule,HttpClient } from '@angular/common/http';


import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService implements OnInit {
ngOnInit()
{

}
constructor(private http: Http) {}
authentifier(user :User)
{
  var headers = new Headers();
  

  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization","Basic Y2xpZW50bW9iaWxlOm9yY2FAMjAxOA==");    
 // console.log("Blabla");

  //const body = JSON.stringify({grant_type:"password",username:"en_kerkar@esi.dz", password: "orca@2018"});

  const body="grant_type=password&username="+user.email+"&password="+user.password+"&code=1"

  return this.http.post('http://192.168.101.17:8000/oauth/login',body, {headers: headers})
  .catch(this.handleErrors);
  

 // localStorage.setItem('blur','true');
  
}

  

  register(user: User) {
    return this.http.post(
      Config.apiUrl + "user/" + Config.appKey,
      JSON.stringify({
        email: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .catch(this.handleErrors);
  }
  
  login(user: User) {
    return this.http.post(
      Config.apiUrl,
      JSON.stringify({
        grant_type: "password",
        username: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .map(response => response.json())
    .do(data => {
      
      Config.token = data._kmd.authtoken
    })
    .catch(this.handleErrors);
    
    //localStorage.setItem('blur','true');
  }

  getCommonHeaders() {
    let headers = new Headers();
   headers.append("Content-Type", "application/x-www-form-urlencoded");
   headers.append("Authorization","Basic c0xPUEthRXNDc0JoTmRzVGdRTExJVDlZeVpVU1FveVJ1bW5VcmI0NFAzdURsaWNZdHY1MVkxazlCdHpVNGVIVzpjMHhQVUV0aFJYTkRjMEpvVG1SelZHZFJURXhKVkRsWmVWcFZVMUZ2ZVZKMWJXNVZjbUkwTkZBemRVUnNhV05aZEhZMU1Wa3hhemxDZEhwVk5HVklWenB3VHpaSE5raHBkRkYzVldWSE9FNXZhMjl2VkZwVFNWaElSV1ZpZEhoUFRtbGxibE5FU2xkcFoxazJlbUo1YW0xeU1VOVNUSEo1Y210dWJHMVhVM1pZ");    
    return headers;
  }

  handleErrors(error: Response) {
    console.log("blabla");
        console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}