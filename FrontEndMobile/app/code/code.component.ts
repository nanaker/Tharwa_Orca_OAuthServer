import { Component, OnInit } from "@angular/core";
import { Router , ActivatedRoute} from "@angular/router";
import { NgClass } from "@angular/common";

@Component
({
    selector: "code",
     moduleId: module.id,
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
      ngOnInit()
      {
          /// Sending the code
      
         // this.myCode = (Math.abs((10000*Math.random()))).toString() ; 
          this.route.queryParams.subscribe(params =>{
            this.tel= params["phone"],
            this.mail = params["mail"],
            this.myCode = params["code"]

    });
          this.input = {
            recipient: this.tel,
            message: this.myCode
        }
      //  this.send();

      }
      public myCode : string;
      public constructor(private router:Router,private route:ActivatedRoute)
      {  
          
       
      }
      public confirm()
      {
         if(this.myCode == this.entered )
         {      
                
                this.router.navigate(["/home"]);
         }
         else
         {
             alert("Error");
            // this.showError();
         }
      }
 /*      public send() {
        if(this.input.recipient != "" && this.input.message != "") {
            TNSPhone.sms([this.input.recipient], this.input.message).then(result => {
                    console.dir(result);
                    this.input.recipient = "";
                    this.input.message = "";
                }, error => {
                    console.dir(error);
                });
        }
    }*/
  
  }
