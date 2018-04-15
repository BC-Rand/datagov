import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  getHospital(county){
    return this._http.get(`https://data.medicare.gov/resource/5ngy-qv3v.json?state=WA&county_name=${county}`);
  }

  getLocation(street){
    return this._http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}&key=AIzaSyBdelVti2c9ZyIEel-jJgWk1lz8X-uvICY`);
  }
}
