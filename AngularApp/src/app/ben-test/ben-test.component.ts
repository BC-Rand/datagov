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
  constructor(
    private _http : HttpService
  ) { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const mapProp = {
      center: new google.maps.LatLng(20, 0),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}
