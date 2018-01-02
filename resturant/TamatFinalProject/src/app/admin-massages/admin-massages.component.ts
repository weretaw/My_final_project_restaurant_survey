import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { Http,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
@Component({
  selector: 'app-admin-massages',
  templateUrl: './admin-massages.component.html',
  styleUrls: ['./admin-massages.component.css']
})
export class AdminMassagesComponent {
allmassages:any [];
  constructor(private authHttp: AuthHttp) { this.getAllMassages()}

 
   getAllMassages() {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    this.authHttp.get('http://localhost:65023/api/ContactUs', { headers: myHeader })
      .subscribe(
      rsp => {
        if (rsp.status == 200) {
          this.allmassages = rsp.json();
        }
        else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);}
    );

}
}
