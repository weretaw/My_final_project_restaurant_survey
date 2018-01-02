import { Http } from '@angular/http';import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
export class saveUser {
 private url : string;
 
 Post(body : any) {
this.url = "http://localhost:65023/api/Users";    
 return this.http.post(this.url,body)
 }
 constructor(@Inject(Http) private http:Http){
 }
}