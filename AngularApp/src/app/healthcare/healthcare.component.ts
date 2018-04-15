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
  // zip: any;


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    // this.getHospitalData();
    // this.getCurrentLocation();
  }

  getHospitalData(){
    let obs = this._httpService.getHospital(this.county);
    obs.subscribe(data => {this.hospital = data;
      console.log(data);
    })
  }

  getCurrentLocation(){
    console.log(this.street);
    let obs = this._httpService.getLocation(this.street);
    obs.subscribe(data => {this.location = data;
      console.log(this.location.results[0].address_components);
    })
  }
}
