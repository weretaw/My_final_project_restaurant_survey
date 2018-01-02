import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { Http } from '@angular/http';
import { saveUser } from './saveUser.service';
import {GetResturantsService} from './services/GetResturantsService';


@Injectable()
export class AuthService {
    
    auth0 = new auth0.WebAuth({
    clientID: 'EkyyppkPAeuXu2gL7WvB1B4ykbNktXXv',
    domain: 'restauranta.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:65023/api',
    redirectUri: 'http://localhost:4200/',      
    scope: 'openid userinfo email  profile read:resource_servers'
  });
  
  constructor(public router: Router,private http : Http,private service:saveUser,private GetResturantsService:GetResturantsService) { }
  userProfile: any;
  profile:any;
  newUser:any;
  public login(): void {
    this.auth0.authorize();
   
  }
  
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';      
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.errorDsecription}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
        
      this.getProfile((err, profile) => {
      this.profile = profile;
      const user={Email: this.profile.email}
      const req = this.service.Post(user);
      req.subscribe( rsp => {
      if(rsp.status == 201){
      console.log("success : " + rsp);}
      else{console.log("server responded error : " + rsp);}
      } ,
      (err) => {
      console.log("error : " + err);
      }
      );
    });
  }

adminOrNot:boolean;

 public getAdmin():boolean
{
  return this.adminOrNot;
}

   isUserAdmin(email : string) {
    this.GetResturantsService.GetUsers(email)
      .subscribe(
       rsp => {
         if (rsp.status == 200) {
           this.adminOrNot = rsp.json();
        }
        else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);}
    );
}

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem("email");
    // Go back to the Top10 route
    this.router.navigate(['/Top10']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  
  public getProfile(cb): void {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access token must exist to fetch profile');
  }
  const self = this;
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
       localStorage.setItem("email",self.userProfile.email);
       this.isUserAdmin(self.userProfile.email);
    }
    cb(err, profile);
  });
}
}
