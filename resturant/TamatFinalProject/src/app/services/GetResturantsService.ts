import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Http,Headers } from '@angular/http';


export class GetResturantsService
{
     private url="http://localhost:65023/api";

   GetResturantByArea(Area :string) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.get(this.url+"/Restaurants?Area="+Area, { headers: myHeader });
 }

    GetResturantByCategoey(Categoey :string) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.get(this.url+"/Restaurants?Category="+Categoey, { headers: myHeader });
 }

    GetAllRestaurants() {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.get(this.url+"/Restaurants", { headers: myHeader });
 }

    GetAreaAndCategory(RestaurantName:string) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.get(this.url+"/Restaurants?RestaurantName="+RestaurantName, { headers: myHeader });
 }

   PostReview(body :any) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.post(this.url+"/Reviews/",body, { headers: myHeader });
 }

   GetTopTen() {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.http.get(this.url+"/Restaurants");
 }

  DeleteRestaurant(Id : number) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.delete(this.url+"/Restaurants/"+Id);
 }

  EditRestaurant(bodyID : number,body : any) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.put(this.url+"/Restaurants/"+bodyID,body);
 }

  PostResturant(body : any) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.http.post(this.url+"/Restaurants/",body);
 }

  GetUsers(Email : string) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.get(this.url+"/Users?email="+Email,{ headers: myHeader });
 }

   GetAllUsers() {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    return this.AuthHttp.get(this.url+"/Users",{ headers: myHeader });
 }

   EditUsers(bodyID : number,body : any) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
 return this.AuthHttp.put(this.url+"/Users/"+bodyID,body);
 }
 
 constructor(@Inject(AuthHttp) private AuthHttp:AuthHttp,@Inject(Http) private http: Http ){
 }
}