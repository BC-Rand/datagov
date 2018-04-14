import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private _http: HttpClient) { }

    getLocations() {
        console.log('getting locations in service');
        return this._http.get('/allLocations');
    }
}
