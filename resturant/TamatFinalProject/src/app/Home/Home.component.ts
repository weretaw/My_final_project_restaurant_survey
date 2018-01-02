import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import {GetResturantsService} from '../services/GetResturantsService'

@Component({
    selector:'Home',
    templateUrl:`./Home.html`,
    styleUrls: ['./Home.css']
})
    
export class Homecomponent
{
 arrAreaAndCategorys : any [];
 changeScrrenCategory:boolean=false;
 booleanLocation : boolean;
 videoChange:boolean=false;
   constructor(private auth: AuthService,private router : Router,private GetResturantsService:GetResturantsService) {
    this.auth.isAuthenticated();
    this.auth.handleAuthentication();
}

 getResturantByArea(AreaStr:string) {
    this.GetResturantsService.GetResturantByArea(AreaStr)
      .subscribe(
      rsp => {
        if (rsp.status == 200) {
          this.arrAreaAndCategorys = rsp.json();
          this.changeScrrenCategory = true;
          this.booleanLocation=true;
          this.videoChange=true;
        }
        else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);}
    );

}


getResturantByCategory(CategoryStr:string) {
    this.GetResturantsService.GetResturantByCategoey(CategoryStr)
      .subscribe(
      rsp => {
        if (rsp.status == 200) {
          this.arrAreaAndCategorys = rsp.json();
          this.changeScrrenCategory = true;
          this.booleanLocation=false;
          this.videoChange=true;
        }
        else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);}
    );

}

}


