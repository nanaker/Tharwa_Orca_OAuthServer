import { Component, OnInit } from '@angular/core';


import { HttpClientModule,HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-listbanque',
  templateUrl: './listbanque.component.html',
  styleUrls: ['./listbanque.component.scss']
})
export class ListbanqueComponent implements OnInit {
  
  constructor(private httpClient:HttpClient) 
  {}
  
  ngOnInit() {
    this.getBanque();
  }
  banques :any[];
  getBanque()
  {
    this.httpClient.get('http://127.0.0.1:4400/banque')

    .subscribe(
      (data:any[]) =>
      { 
         
        this.banques = data;
      }
    )
  }
  

}
