import { Component, OnInit } from "@angular/core";
import { Router , ActivatedRoute, NavigationExtras} from "@angular/router";
import { NgClass } from "@angular/common";
import { UserService } from "../shared/user/user.service";
import {User} from "../shared/user/User";

@Component
({
    selector: "code",
     moduleId: module.id,
     providers: [UserService],
    templateUrl: "./code.html",
    styleUrls: ["./code-common.css"]
}
)

export class CodeComponent implements OnInit{
     public time : TimeRanges;
     public input: any;
     public tel : string;
     public entered:string;
     public mail : string;
     public user : User;
     public expires;
     access_token;
     refresh_token;
      ngOnInit()
      {
          /// Sending the code
      
         // this.myCode = (Math.abs((10000*Math.random()))).toString() ; 
          this.route.queryParams.subscribe(params =>{
            this.tel= params["phone"],
            this.mail = params["mail"],
            this.myCode = params["code"],
            this.user = params["user"]

    });
          this.input = {
            recipient: this.tel,
            message: this.myCode
        }
    
      //  this.send();

      }
      public myCode : string;
      public constructor(private router:Router,private route:ActivatedRoute,private userService: UserService)
      {  
          
       
      }
      public confirm()
      {
           this.userService.sendCode(this.mail,this.entered)
           .map(response => 
            {
             response = response.json();
             this.access_token = response.access_token;
             this.refresh_token = response.refresh_token;
             this.expires = response.expires_in;
             console.log(this.expires);
            })
          .do(data => {
         
        
        
        //Config.token = data.access_token
      })
          .subscribe(
            
            (res) =>
           {
            let navigationExtras : NavigationExtras = {
              queryParams: {
                  "access_token":this.access_token,
                  "refresh_token" :this.refresh_token,
                  "expires" :this.expires
              }
          }
              
            this.router.navigate(["/home"],navigationExtras);
            
           },
           
            (error) => alert("something went wrong")
          );

    
         
      

      }
  
  }
