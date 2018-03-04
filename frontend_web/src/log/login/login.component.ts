import { Component, OnInit } from '@angular/core';
import { LogComponent } from '../log.component';

import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule,HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }
  

  authentifier()
  {
    var headers = new HttpHeaders();
    

    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("Authorization","Basic c0xPUEthRXNDc0JoTmRzVGdRTExJVDlZeVpVU1FveVJ1bW5VcmI0NFAzdURsaWNZdHY1MVkxazlCdHpVNGVIVzpjMHhQVUV0aFJYTkRjMEpvVG1SelZHZFJURXhKVkRsWmVWcFZVMUZ2ZVZKMWJXNVZjbUkwTkZBemRVUnNhV05aZEhZMU1Wa3hhemxDZEhwVk5HVklWenB3VHpaSE5raHBkRkYzVldWSE9FNXZhMjl2VkZwVFNWaElSV1ZpZEhoUFRtbGxibE5FU2xkcFoxazJlbUo1YW0xeU1VOVNUSEo1Y210dWJHMVhVM1pZ");    
    

    const body = {"grant_type":"password","username":"en_kerkar@esi.dz", "password": "orca@2018"};

    this.httpClient.post('http://192.168.0.164:4000/oauth/login',body, {headers: headers})
    .subscribe(response => 
      {
        console.log(response);
      }
      ,err => {
        console.log(err);
      }
    );
    

    localStorage.setItem('blur','true');
    
  }



}
