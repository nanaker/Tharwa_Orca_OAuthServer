import { Component } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private httpClient:HttpClient){}
  name : String ='';
  selectedItem : number;
  myValue : boolean;

  ngOnInit(){
    this.myValue = true;
  }

  onNameKeyUp(event : any){
    this.name = event.target.value;

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