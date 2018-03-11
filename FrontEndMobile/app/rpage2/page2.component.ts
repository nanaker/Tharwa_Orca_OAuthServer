import { Component , OnInit ,ViewChild, Input,AfterViewInit} from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { Router , ActivatedRoute } from "@angular/router";
import { Page } from "ui/page";
import { RegisterComponent } from "../register/register.component";
import * as Camera from "nativescript-camera";
@Component
({
    moduleId: module.id,
    selector: "ns-page2",
     providers : [UserService],
    templateUrl: "page2.component.html",
})
export class Page2Component implements OnInit{
     user: User ;
     usedId: number= 0;
     picture: any;
ngOnInit(){   
    this.picture = "https://placehold.it/100x100";
    this.user = new User(0);
    this.route.queryParams.subscribe(params =>{
    this.user.firstname = params["firstname"], 
    this.user.lastname = params["lastname"], 
    this.user.email = params["email"],
    this.user.password = params["password"]
        });
    console.log(JSON.stringify(
        {
        type : 'LOG_TO_CONSOLE',
        payload : this.user.firstname,
        }
    ));
}

    public constructor(private location: Location,private router: Router, private userService: UserService
        ,private page: Page, private route:ActivatedRoute) {
            
    }  

    public goBack() {
        this.location.back();
    }
    public register() 
    {
        if(this.user.firstname && this.user.lastname && this.user.email && this.user.password &&
        this.user.job && this.user.phone && this.user.address) 
        {
            alert("ça va");
        this.userService.register(this.user).subscribe(
           () => {
              alert("compte créer avec succés.");
              this.location.back();
            },
          error => alert("Erreur Compte n'a pas été créé!")
          );
        }
        else    
        {
            alert("Veuillez Remplir tous les champs !!")
        }
    }
    public goSuivant()
    {
        this.router.navigate(["/page2"]);
    }
    
    public takePic()
    {
        /*var camera = require("nativescript-camera");
        var imageModule = require("ui/image");
        camera.takePicture().then(function (imageAsset) {
        console.log("Result is an image asset instance");
        var image = new imageModule.Image();
        image.src = imageAsset;
        this.user.picture = imageAsset;
        console.log("miaw"+ this.user.picture);
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });*/
    Camera.takePicture().then(picture => {
        this.picture = picture;
        this.user.picture = picture;
    });
    
    }
    
 
}