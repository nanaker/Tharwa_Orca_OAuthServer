import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { UserService } from "../shared/user/user.service";
import { User } from "../shared/user/user";
import { Router , ActivatedRoute, NavigationExtras} from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    providers : [UserService],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    refresh_token;
    access_token;
    expires;
    user: User;
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    public cpt = 0;
    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.route.queryParams.subscribe(params =>{
            this.access_token= params["access_token"],
            this.refresh_token = params["refresh_token"],
            this.expires = params["expires"]

    });
    
    setInterval(() => {
        this.userService.refreshLogin(this.refresh_token)
        .map(response => 
            {
             response = response.json();
             this.access_token = response.access_token;
             //this.refresh_token = response.refresh_token;
             if(this.cpt==0)
             {
             this.expires = response.expires_in;
             }
             
             console.log("miaw"+this.expires);
            })
          .do(data => {
         
        
        
        //Config.token = data.access_token
      })
          .subscribe(
            
            (res) =>
           {
          
              
           // this.router.navigate(["/home"],navigationExtras);
            
           },
           
            (error) => this.router.navigate(["/login"])
          );
    }, 1000*this.expires);
    }
    public constructor(private router:Router,private route:ActivatedRoute,private userService: UserService)
    {  
        
     
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
