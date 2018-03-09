import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router,NavigationExtras } from "@angular/router";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { SnackBar } from "nativescript-snackbar";
import {Page} from "ui/page";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
 

@Component  ({
  selector: "login",
  templateUrl: "./login.html",
  providers : [UserService],
  styleUrls: ["./login-common.css", "./login.css"]
})
export class LoginComponent implements OnInit {
  public user: User;
  isLoggingIn = true;
  viaSMS = true;
  viaMail = false;
  public myCode;
  public access_token;
  public refresh_token;
  constructor(private router: Router, private userService: UserService,private page: Page) {
    this.user = new User(0);
  
  }
  ngOnInit()
  {
    this.page.actionBarHidden = true;
    //this.page.backgroundImage = "res://bg_login";
    this.user.email ="test_tharwa@mailinator.com";
    this.user.password="orca@2018";
  }
  submit() {
   
   this.userService.authentifier(this.user)
      .map(response => 
        {
         response = response.json();
         this.myCode = response["code"];
         this.access_token = response.access_token;
         this.refresh_token = response.refresh_token;
         console.log(this.myCode);
    //localStorage.setItem("access_token",data["access_token"]);
    //localStorage.setItem("refresh_token",data["refresh_token"]);
        })
      .do(data => {
     
    
    
    //Config.token = data.access_token
  })
      .subscribe(
        
        (res) =>
         {
          console.log(res);
          let navigationExtras : NavigationExtras = {
            queryParams: {
                "phone":this.user.phone,
                "mail" :this.user.email,
                "code" :this.myCode
            }
        }
        this.router.navigate(["/code"],navigationExtras);
        
      },
       
        (error) => alert("something went wrong")
      );
      //this.router.navigate(["/home"]);
  }
  public register()
  {
      this.router.navigate(["/register"]);
  }
  public login() {
    if(this.user.email && this.user.password )
    {
    this.userService.login(this.user)
      .subscribe(
        () => {
         
        
        
      },
        (error) => alert("Unfortunately we could not find your account.")
      );
    }
    else {
         alert("All Fields Required!")
    }
  }
  /*signUp() {
    this.userService.register(this.user)
      .subscribe(
       () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
      error => alert("Unfortunately we were unable to create your account.")
      );
  }*/
  toggleDisplay()
  {
    this.isLoggingIn = !this.isLoggingIn;
  }

  @ViewChild("CB1") FirstCheckBox: ElementRef;

  public toggleCheck() {
     
  }

  public getCheckProp() {
      console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
  }
}