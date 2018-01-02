import { Component, OnInit } from '@angular/core';
import { GetResturantsService } from '../services/GetResturantsService'

@Component({
  selector: 'app-admin-or-user',
  templateUrl: './admin-or-user.component.html',
  styleUrls: ['./admin-or-user.component.css']
})
export class AdminOrUserComponent implements OnInit {


  ngOnInit() {
  }
  arrAllResturants: any[];
  change: boolean;
  EditFormHide: boolean = null;
  AddResurantFormHide: boolean;
  deleteRestaurant: any;
  resurantToEdit: IUser;
  Email: string;
  Role: string;
  ReservationUrl: string;

  constructor(private GetResturantsService: GetResturantsService) {this.getUsers() }


  getUsers() {
    this.GetResturantsService.GetAllUsers()
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


  DeleteUser(Id: number) {
    const req = this.GetResturantsService.DeleteRestaurant(Id);
    req.subscribe(rsp => {
      console.log(rsp.json);
    })
     this.arrAllResturants.splice(Id,1);
  }

  editUser(user: IUser) {
    this.resurantToEdit = user;
    this.change = !this.change;
    this.AddResurantFormHide = false;
  }


  onSubmit(trvFormEdit) {
    const body = {
      Id: this.resurantToEdit.Id,
      Email: this.resurantToEdit.Email,
      Role: this.resurantToEdit.Role,
    }
    console.log(body)
    let req = this.GetResturantsService.EditUsers(body.Id, body);
    req.subscribe(rsp => {
      console.log(rsp);
      console.log(this.resurantToEdit.Email)
    });
    this.AddResurantFormHide = null;
    this.change = !this.change;
  }
}
export interface IUser{
  Id: number;
  Email: string;
  Role: string;
}
