import {Component} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../auth.service';
import { RatingModule } from "ng2-rating";

@Component({
    selector:'ContactUs',
    templateUrl:'./Contactus.html',
    styleUrls: ['./Contactus.css']  
})

export class ContactUscomponent 
{
    Subject:string;
    FullName:string;
    Email:string;
    Massage:string;
    formhiden:boolean=true;

    constructor(private http: Http) { 
       
    }

    clickHandlerPost() {
        
        const body = {
            Subject: this.Subject, FullName: this.FullName, Email:this.Email,
            Massage: this.Massage
        };
        console.log(body);
        const req = this.http.post("http://localhost:65023/api/ContactUs",body)
        req.subscribe(rsp => {
            if (rsp.status == 201) {
                console.log("success : " + rsp);
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            }
        );
       this.formhiden=false;
       this.Subject="";this.FullName="";this.Email="";this.Massage="";
    }
    
     public submitHandler(ContactData:any)
     
   {
       this.clickHandlerPost()
       console.log(ContactData);
       
   }  
  public send = false;

  saveTodos(): void {
   //show box msg
   this.send = true;
   //wait 3 Seconds and hide
   setTimeout(function() {
       this.send = false;
       this.formhiden=true;
       console.log(this.edited);
   }.bind(this), 5000);
  }
    
}