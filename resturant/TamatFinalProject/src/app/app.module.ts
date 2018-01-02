import { Validators } from '@angular/forms'; import { Http,Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service'; import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { NgModule } from '@angular/core'; import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; import { Resturantscomponent } from './Resturants/Resturants';
import {HttpModule} from '@angular/http'; import { saveUser } from './saveUser.service';
import {Homecomponent} from './Home/Home.component';  import {ContactUscomponent} from './ContactUs/ContactUs.component';
import { AppComponent }  from './app.component';import {AddReviewcomponent} from './AddReview/AddReview.component';
import {Top10component} from './Top10/Top10.component'; import { RatingModule } from "ng2-rating";  
import {ProfileComponent} from './Profile/profileUser.component'; import {Aboutcomponent} from './About/About.component';
import { RouterModule, Routes } from '@angular/router'; import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls'; import { AddResurantComponent } from './add-resurant/add-resurant.component';
import { AdminMassagesComponent } from './admin-massages/admin-massages.component'; import {GetResturantsService} from './services/GetResturantsService';
import { AdminOrUserComponent } from './admin-or-user/admin-or-user.component'
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


const appRoutes: Routes = [
{ path: 'home', component: Homecomponent },
{ path: 'Top10', component: Top10component},
{ path: 'AddReview', component: AddReviewcomponent,canActivate :[AuthGuard] },
{ path: 'About', component: Aboutcomponent},
{ path: 'ContactUs', component: ContactUscomponent },
{ path: 'Profile', component: ProfileComponent ,canActivate :[AuthGuard]},
{ path: 'EditResurant', component: AddResurantComponent,canActivate :[AuthGuard]},
{ path: 'AdminMassages', component: AdminMassagesComponent,canActivate :[AuthGuard]},
{ path: 'AdminOrUser', component: AdminOrUserComponent,canActivate :[AuthGuard] }
];


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}
@NgModule({
  declarations: [
    AppComponent, Homecomponent, 
    Top10component, AddReviewcomponent,
    Aboutcomponent, ContactUscomponent,
    ProfileComponent,Resturantscomponent, 
    AddResurantComponent, AdminMassagesComponent, 
    AdminOrUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    RatingModule,VgControlsModule,
    VgCoreModule,
  ],
  providers: [GetResturantsService,AuthService,
              saveUser,AuthGuard,
      {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions],
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
