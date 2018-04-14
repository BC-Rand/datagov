import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
    locations;
    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.getLocations();
    }

    getLocations() {
        const observable = this._httpService.getLocations();
        observable.subscribe(data => {
            this.locations = data['locations'];
        });
    }

}
