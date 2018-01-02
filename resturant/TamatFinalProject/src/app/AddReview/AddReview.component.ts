import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { RatingModule } from "ng2-rating";
import {GetResturantsService} from '../services/GetResturantsService'

@Component({
    selector: 'AddReview',
    templateUrl: `./AddReview.html`,
    styleUrls: ['./AddReview.css']
})


export class AddReviewcomponent {

    RestaurantName: string;
    Category: string;
    Area: string;
    Review: string;
    Rate: number;
    arRestaurant: any[];
    arrResturantCtegory :any [];
    formhiden:boolean=true;
    

    constructor(private auth: AuthService,private GetResturantsService:GetResturantsService) {
        this.getRestaurants()
    }

    clickHandlerPost() {
        const body = {
            RestaurantName: this.RestaurantName, Category: this.Category,
            Area: this.Area, Review: this.Review, Rate: this.Rate,UsersEmail: localStorage.getItem("email")
        };
        const req = this.GetResturantsService.PostReview(body)
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
        this.RestaurantName="";this.Category="";this.Area="";this.Review="";this.Rate=0;
    }

    getRestaurants() {
        this.GetResturantsService.GetAllRestaurants()
            .subscribe(
            rsp => {
                if (rsp.status == 200) {
                    this.arRestaurant = rsp.json();
                }
                else { console.log("server responded error : " + rsp); }
            },
            (err) => {
                console.log("error : " + err);
            }
            );

    }

    getResturanrCtegoryAndArea()
{
    this.GetResturantsService.GetAreaAndCategory(this.RestaurantName)
      .subscribe(
      rsp => {
        if (rsp.status == 200) {
          this.arrResturantCtegory = rsp.json();
        }
        else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);}
    );
}

    public submitHandler(ReviewData: any) {
        this.clickHandlerPost()
        console.log(ReviewData);
    }

    public send = false;

  saveTodos(): void {
   //show box msg
   this.send = true;
   //this.formhiden=false;
   //wait 3 Seconds and hide
   setTimeout(function() {
       this.send = false;
       this.formhiden=true;
       console.log(this.edited);
   }.bind(this), 2000);
  }
}