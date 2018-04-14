import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-healthcare',
  templateUrl: './healthcare.component.html',
  styleUrls: ['./healthcare.component.css']
})
export class HealthcareComponent implements OnInit {
  hospital: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  getHospitalData(){
    let obs = this._httpService.getHospital('');
    obs.subscribe(data => {this.hospital = data;
    })
  }
}
