import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { Page2Component } from "./rpage2/page2.component";
import { CodeComponent } from "./code/code.component";

/*export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full" },
    {path: "login", loadChildren: "./login/login.module#LoginModule" },
    {path: "register", loadChildren: "./register/register.module#RegisterModule" },
    {path : "page2", loadChildren: "./rpage2/page2.module#Page2Module"},
    //{path: "code", loadChildren: "./code/code.module#CodeModule"},
    {path: "home", loadChildren: "./home/home.module#HomeModule" },
    {path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
    {path: "search", loadChildren: "./search/search.module#SearchModule" },
    {path: "featured", loadChildren: "./featured/featured.module#FeaturedModule" },
    {path: "settings", loadChildren: "./settings/settings.module#SettingsModule" }

];*/

export const routes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent},
    {path : "page2",component: Page2Component},
    {path:"code",component:CodeComponent},
    {path: "home", loadChildren: "./home/home.module#HomeModule" },
    {path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
    {path: "search", loadChildren: "./search/search.module#SearchModule" },
    {path: "featured", loadChildren: "./featured/featured.module#FeaturedModule" },
    {path: "settings", loadChildren: "./settings/settings.module#SettingsModule" }
  
];

export const navigatableComponents = [
  LoginComponent,RegisterComponent, Page2Component,CodeComponent
];
/*@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }*/
