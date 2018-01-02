import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {GetResturantsService} from './services/GetResturantsService'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
 Area : string;
 Category:string;
 name:any;
 role : boolean;
 arrUsers : any;
 adminEmail:any;

  constructor(private auth: AuthService,private router : Router,private GetResturantsService:GetResturantsService) {
   
    this.auth.isAuthenticated();
    this.auth.handleAuthentication();
    this.adminEmail=localStorage.getItem("email");
     this.auth.isUserAdmin(this.adminEmail);
     
  }
    
}
