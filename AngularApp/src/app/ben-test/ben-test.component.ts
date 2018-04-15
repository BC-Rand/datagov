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
  failCount = 0;
  constructor(
    private _http : HttpService
  ) { }

  ngOnInit() {
    this.initMap();
    let obs = this._http.getLocations();
    obs.subscribe(data => {
      this.locations = data['locations'];
      console.log(this.locations);
      let count = 0
      for (let i=0; i<this.locations.length; i++) {
        if (this.locations[i].hasOwnProperty("Coordinates")) {
          console.log(this.locations[i].Coordinates);
          count++
        }
      }
      console.log(count);
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
        console.log("Geocode failed", locationObj.Address, locationObj._id);
        this.failCount++;
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
        let markerObj = {
          location: data['Coordinates'],
          title: data['Name_of_Program']
        }
        this.createMarker(markerObj);
      }
    });
  }
  createMarker(obj) {
    let marker = new google.maps.Marker({
      position: obj.location,
      map: this.map,
      title: obj.title
    })
  }
}
