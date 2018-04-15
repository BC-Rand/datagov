import { Component, OnInit, ViewChild } from '@angular/core';
import {  } from '@types/googlemaps';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-ben-test',
  templateUrl: './ben-test.component.html',
  styleUrls: ['./ben-test.component.css']
})
export class BenTestComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any
  map : google.maps.Map;
  locations;
  geocodedLocations = [];
  coordinateLocations = [];
  constructor(
    private _http : HttpService
  ) { }

  ngOnInit() {
    this.initMap();
    let obs = this._http.getLocations();
    obs.subscribe(data => {
      this.locations = data['locations'];
      console.log(this.locations);
      for (let i=0; i<this.locations.length; i++) {
        if (this.locations[i].hasOwnProperty("Coordinates")) {
          this.coordinateLocations.push(this.locations[i]);
          this.locations.splice(i,1);
          i--;
        }
      }
      console.log(this.locations);
      console.log(this.coordinateLocations.length);
      for (let i=0; i<this.coordinateLocations.length; i++) {
        this.createMarker(this.coordinateLocations[i]);
      }
    });
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
  geocodeAllLocations(num) {
    if (num < this.locations.length) {
      this.geocode(this.locations[num]);
      setTimeout(this.geocodeAllLocations(++num), 100);
    }
  }
  geocode(locationObj) {
    let obs = this._http.geocode(locationObj.Address);
    obs.subscribe(data => {
      if (data['status'] == "OK") {
        locationObj.Coordinates = data['results'][0]['geometry']['location'];
        this.geocodedLocations.push(locationObj);
      } else {
        console.log("Geocode failed", data);
      }
    });
  }

  updateGeocodedLocations(i) {
    if (i<this.geocodedLocations.length) {
      this.updateCoordinates(this.geocodedLocations[i]);
      setTimeout(this.updateGeocodedLocations(++i), 100);
    }
  }

  updateCoordinates(obj) {
    let obs = this._http.updateCoordinates(obj._id, obj.Coordinates);
    obs.subscribe(data => {
      console.log("updateCoordinates obs response", data)
      if (data['message'] == "Success") {
        
      }
    });
  }
  logGeocodedLocations() {
    console.log(this.geocodedLocations);
    for (let i=0; i<this.geocodedLocations.length; i++) {

    }
  }
  createMarker(obj) {
    let marker = new google.maps.Marker({
      position: obj.Coordinates,
      map: this.map,
      title: obj.Name_of_Program
    })
  }
}
