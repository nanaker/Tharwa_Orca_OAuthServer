import { Component, OnInit } from '@angular/core';


import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listbanquier',
  templateUrl: './listbanquier.component.html',
  styleUrls: ['./listbanquier.component.scss']
})
export class ListbanquierComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {

    this.getBanquier();
  }
  banquiers :any[];
  getBanquier()
  {

    this.httpClient.get('http://127.0.0.1:4000/banquier')

    .subscribe(
      (data:any[]) =>
      { 
        this.banquiers = data;
      }
    )
  }

}
