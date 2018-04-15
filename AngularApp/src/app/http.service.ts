import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { encode } from 'punycode';

@Injectable()
export class HttpService {
    constructor(private _http: HttpClient) { }

    getHospital(county) {
        return this._http.get(`https://data.medicare.gov/resource/5ngy-qv3v.json?state=WA&county_name=${county}`);
    }
    getLocation(street) {
        return this._http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}&key=AIzaSyBdelVti2c9ZyIEel-jJgWk1lz8X-uvICY`);
    }
    registerUser(user) {
        return this._http.post('/register', user);
    }
    loginUser(user) {
        return this._http.post('/login', user);
    }
    getLocations() {
        console.log('getting locations in service');
        return this._http.get('/allLocations');
    }
    geocode(address) {
        address = encodeURI(address);
        address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCSxIGubowe1uJ3mn5o6BBO5QiZ39an97w";
        console.log("Address: ", address);
        return this._http.get(address);
    }
    updateCoordinates(_id, coordinatesObj) {
        return this._http.post("/updatecoordinates", {
            _id: _id,
            coordinates: coordinatesObj
        })
    }
  
    registerUser(user){
        return this._http.post('/register', user);
    }
    loginUser(user){
        return this._http.post('/login', user);
    }
}
