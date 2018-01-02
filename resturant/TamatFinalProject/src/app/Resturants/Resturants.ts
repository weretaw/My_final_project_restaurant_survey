import { Component,Input} from '@angular/core';
import { Http } from '@angular/http';
@Component({
    selector:'Resturants',
    templateUrl:`./Resturants.html`,
    styleUrls: ['./Resturants.css']
})

export class Resturantscomponent {

 @Input() arrAreaAndCategorys : any [];
 @Input() changeScrrenCategory : boolean;
 @Input() booleanLocation : boolean;

    Rating: number;
  
    constructor(private http: Http) { }
}