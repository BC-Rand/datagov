import { Component, OnInit } from '@angular/core';
import {  } from '@types/googlemaps';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-ben-test',
  templateUrl: './ben-test.component.html',
  styleUrls: ['./ben-test.component.css']
})
export class BenTestComponent implements OnInit {
  map : google.maps.Map;
  constructor() { }

  ngOnInit() {
  }

}
