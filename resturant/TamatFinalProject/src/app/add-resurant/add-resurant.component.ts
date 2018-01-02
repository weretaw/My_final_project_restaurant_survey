import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { GetResturantsService } from '../services/GetResturantsService'

@Component({
  selector: 'app-add-resurant',
  templateUrl: './add-resurant.component.html',
  styleUrls: ['./add-resurant.component.css']
})
export class AddResurantComponent {
  arrAllResturants: any[];
  change: boolean;
  EditFormHide: boolean = null;
  AddResurantFormHide: boolean;
  deleteRestaurant: any;
  resurantToEdit: Iresurant;
  Name: string;
  Area: string;
  Category: string;
  Rating: string;
  NumberOfRatings: string;
  ReservationUrl: string;

  constructor(private GetResturantsService: GetResturantsService) { this.getResturants(); }


  getResturants() {
    this.GetResturantsService.GetAllRestaurants()
      .subscribe(
      rsp => {
        if (rsp.status == 200) {
          this.arrAllResturants = rsp.json();
        }
        else { console.log("server responded error : " + rsp); }
      },
      (err) => {
        console.log("error : " + err);
      }
      );
  }


  DeleteRestaurant(Id: number) {
    const req = this.GetResturantsService.DeleteRestaurant(Id);
    req.subscribe(rsp => {
      console.log(rsp.json);
    })
     this.arrAllResturants.splice(Id,1);
  }

  editForm(resurant: Iresurant) {
    this.resurantToEdit = resurant;
    this.change = !this.change;
    this.AddResurantFormHide = false;
  }


  onSubmit(trvFormEdit) {
    const body = {
      ID: this.resurantToEdit.ID,
      Name: this.resurantToEdit.Name,   
      Area: this.resurantToEdit.Area,
      Category: this.resurantToEdit.Category,
      Rating: this.resurantToEdit.Rating,
      NumberOfRatings: this.resurantToEdit.NumberOfRatings,
      ReservationUrl: this.resurantToEdit.ReservationUrl
    }
    let req = this.GetResturantsService.EditRestaurant(body.ID, body);
    req.subscribe(rsp => {
      console.log(rsp);
    });
    this.AddResurantFormHide = null;
    this.change = !this.change;
  }
  addResurant() {
    this.AddResurantFormHide = !this.AddResurantFormHide;
  }

  addMovieSubmitHandler() {
    const body = {
      Name: this.Name,
      Area: this.Area,
      Category: this.Category,
      Rating: this.Rating,
      NumberOfRatings: this.NumberOfRatings,
      ReservationUrl: this.ReservationUrl
    }
    let req = this.GetResturantsService.PostResturant(body);
    req.subscribe(rsp => {
      console.log(rsp.json());
    });
    this.AddResurantFormHide = null;
  }



}
export interface Iresurant {
  ID: number;
  Name: string;
  Area: string;
  Category: string;
  Rating: string;
  NumberOfRatings: string;
  ReservationUrl: string;
}

