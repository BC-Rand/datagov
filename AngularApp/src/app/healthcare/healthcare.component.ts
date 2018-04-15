import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-healthcare',
  templateUrl: './healthcare.component.html',
  styleUrls: ['./healthcare.component.css']
})
export class HealthcareComponent implements OnInit {
  hospital: any;
  county: any;
  location: any;
  street: any;
  userCoordLat: any;
  userCoordLng: any;
  hospCoordLat: any;
  hospCoordLng: any;
  distance: any;


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    // this.getHospitalData();
    // this.getCurrentLocation();
  }

  getCurrentLocation(){
    console.log(this.street);
    let obs = this._httpService.getLocation(this.street);
    obs.subscribe(data => {
      this.location = (data['results'][0].address_components[4].long_name).slice(0, -7);
      // console.log(this.location);
      this.userCoordLat = data['results'][0].geometry.location.lat;
      this.userCoordLng = data['results'][0].geometry.location.lng;
      console.log(this.userCoordLat);
      console.log(this.userCoordLng);
      let observe = this._httpService.getHospital(this.location);
      observe.subscribe(response => {
        this.hospital = response;
        console.log(this.hospital);
        for(let i = 0; i < (this.hospital).length; i++){
          console.log((this.hospital[i].location.coordinates[1]) + ',' + (this.hospital[i].location.coordinates[0]));
          this.hospCoordLat = this.hospital[i].location.coordinates[1];
          this.hospCoordLng = this.hospital[i].location.coordinates[0];
          console.log(this.hospCoordLat);
          console.log(this.hospCoordLng);
          let observing = this._httpService.getDistance(this.userCoordLat,this.userCoordLng,this.hospCoordLat,this.hospCoordLng);
          observing.subscribe(dist => {
            this.distance = dist;
            console.log(this.distance);
          })
        }
      })
    })
  }
}
