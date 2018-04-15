import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;
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
        this.initMap();
    }

    getLocations() {
        const observable = this._httpService.getLocations();
        observable.subscribe(data => {
            this.locations = data['locations'];
            this.createMarkers(this.locations);
            console.log(this.locations);
        });
    }

    updateDistance() {
        for (let i = 0; i < this.locations.length - 1; i++) {
            let dist = 0;
            dist += this.locations[i]['Coordinates']['lat'] - this.lat;
            dist += this.locations[i]['Coordinates']['lng'] - this.lng;
            this.locations[i]['Distance'] = dist;
        }
    }

    sortLocationsByDist() {
        for (let i = 0; i < this.locations.length; i++) {
            for (let y = 0; y < this.locations.length - 1; y++) {
                if (this.locations[y]['Distance'] > this.locations[y + 1]['Distance']) {
                    const temp = this.locations[y];
                    this.locations[y] = this.locations[y + 1];
                    this.locations[y + 1] = temp;
                }
            }
        }
        console.log(this.locations);
    }

    initMap() {
        const mapProp = {
            center: new google.maps.LatLng(47.608380, -122.359),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        console.log(this.map);
    }

    createMarkers(locations) {
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].hasOwnProperty('Coordinates')) {
                const marker = new google.maps.Marker({
                    position: locations[i].Coordinates,
                    map: this.map,
                    title: locations[i].Name_of_Program
                });
            }
        }
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position.coords.latitude, position.coords.longitude);
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.updateDistance();
                this.sortLocationsByDist();
            });
        } else {
            this.lat = 'Geolocation is not supported by this browser.';
        }
    }
}
