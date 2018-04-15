import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { encode } from 'punycode';

@Injectable()
export class HttpService {


  constructor(private _http: HttpClient) { }
  
  registerUser(user){
    return this._http.post('/register', user);
  }
  loginUser(user){
    return this._http.post('/login', user);
  }
    getLocations() {
        console.log('getting locations in service');
        return this._http.get('/allLocations');
    }
    geocode(address) {
        address = encodeURI(address);
        address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "key=AIzaSyCSxIGubowe1uJ3mn5o6BBO5QiZ39an97w";
        return this._http.get(address);
    }
    updateCoordinates(_id, coordinatesObj) {
        return this._http.post("/updatecoordinates", {
            _id: _id,
            coordinates: coordinatesObj
        })
    }

}
