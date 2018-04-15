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
  distList = [];

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
      this.userCoordLat = data['results'][0].geometry.location.lat;
      this.userCoordLng = data['results'][0].geometry.location.lng;
      let observe = this._httpService.getHospital(this.location);
      observe.subscribe(response => {
        this.hospital = response;
        console.log(this.hospital);
        for(let i = 0; i < (this.hospital).length; i++){
          let hospCoordLat = this.hospital[i].location.coordinates[1];
          let hospCoordLng = this.hospital[i].location.coordinates[0];
          console.log("i: " + i, hospCoordLat, hospCoordLng)
          let observing = this._httpService.getDistance(this.userCoordLat,this.userCoordLng,hospCoordLat,hospCoordLng);
          observing.subscribe(dist => {
            let distance = dist['rows'][0].elements[0].distance.text;
            let metric = dist['rows'][0].elements[0].distance.value;
            console.log("i: " + i, dist, metric);
            this.hospital[i]['distance'] = distance;
            this.hospital[i]['metric'] = metric;
            if (this.hospital.length - 1 == i) {
              setTimeout(this.heapsort(this.hospital), 1000);
            }
          })
        }
      })
    })
  }

  heapifySubArray(arr, start) {
    for (let i=Math.floor((arr.length-1-start)/2+start); i >= start; i--) {
        let secondChildIdx = (i-start+1)*2+start;
        if (arr[secondChildIdx]!=undefined&&arr[secondChildIdx]['metric']<arr[i]['metric']) {
            let temp = arr[secondChildIdx]
            arr[secondChildIdx] = arr[i]
            arr[i] = temp;
        }
        if (arr[secondChildIdx-1]!=undefined&&arr[secondChildIdx-1]['metric']<arr[i]['metric']) {
            let temp = arr[secondChildIdx-1]
            arr[secondChildIdx-1] = arr[i]
            arr[i] = temp;
        }
    }
    return arr;
}
heapsort(arr) {
  console.log("heapsort")
  console.log(this.hospital)
    for (let i=0; i<arr.length-1; i++) {
        arr = this.heapifySubArray(arr, i);
    }
    return arr;
}
}
