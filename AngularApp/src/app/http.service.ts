import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private _http: HttpClient) { }

    getLocations() {
        console.log('getting locations in service');
        return this._http.get('/allLocations');
    }

    geocode(address) {
        console.log('geocoding in service');
        // tslint:disable-next-line:max-line-length
        return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCCXR-DhGmrWqToo99WqiqgT26gabtvvO4');
    }
}
