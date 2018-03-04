
import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ChartistModule } from 'ng-chartist';
import { Injectable } from '@angular/core';

import { ProfilComponent } from './profil/profil.component';
import { ListbanqueComponent } from './listbanque/listbanque.component';
import { ListbanquierComponent } from './listbanquier/listbanquier.component';
import { AddbanquierComponent } from './addbanquier/addbanquier.component';
import { ListvirexterneComponent } from './listvirexterne/listvirexterne.component';
import { AddbanqueComponent } from './addbanque/addbanque.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    

    AppComponent,
    HomeComponent,
    NavBarComponent,
    SidebarComponent,
    AddbanqueComponent,
    ListvirexterneComponent,
    AddbanquierComponent,
    ListbanquierComponent,
    ListbanqueComponent,
    ProfilComponent,
  ],
  imports: [
    ChartistModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

@Injectable() 
export class AppModule 
{
  blur: boolean;
}