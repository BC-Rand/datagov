import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
    locations;
    lat;
    lng;
    constructor(private _httpService: HttpService) {
    }

    ngOnInit() {
        this.lat = '';
        this.lng = '';
        this.getLocations();
        this.getUserLocation();
    }

    getLocations() {
        const observable = this._httpService.getLocations();
        observable.subscribe(data => {
            this.locations = data['locations'];
            for (let i = 0; i < this.locations.length; i++) {
                const geocodeObservable = this._httpService.geocode(this.locations[i]['Address']);
                geocodeObservable.subscribe(geocode => {
                    console.log(this.locations[i]['Address']);
                    console.log(geocode['results'][0]['geometry']['location']);
                    this.locations[i]['position'] = geocode['results'][0]['geometry']['location'];
                    // console.log(this.locations[i]);
                });
            }
        });
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords.latitude, position.coords.longitude);
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });
        } else {
            this.lat = 'Geolocation is not supported by this browser.';
        }
    }
}
