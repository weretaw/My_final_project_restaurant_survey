import { Component, AfterViewInit } from '@angular/core';
import {GetResturantsService} from '../services/GetResturantsService'

@Component({
    selector: 'Top10',
    styleUrls: ['./Top10.css'],
    templateUrl: './Top10.html'
})

export class Top10component {

    arTop10: any[]=[];
    arItems: any[];
    Rating: number;
    temp: any;
    constructor(private GetResturantsService:GetResturantsService) { }

    ngAfterViewInit() {
        let index_I;
        let index_J;
        let req = this.GetResturantsService.GetTopTen();
        req.subscribe(rsp => {
            this.arItems = rsp.json();
            for (index_I = 0; index_I < (this.arItems.length); index_I++) {
                for (index_J = index_I + 1;index_J < (this.arItems.length); index_J++) {

                    if (this.arItems[index_I].Rating < this.arItems[index_J].Rating) {
                        this.temp = this.arItems[index_J]
                        this.arItems[index_J]= this.arItems[index_I]
                        this.arItems[index_I] = this.temp;                   
                    }
                }
                this.Rating=this.arItems[index_I];
                this.arTop10.push(this.arItems[index_I]);
            }
        });
    }
}
