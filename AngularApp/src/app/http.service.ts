import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  
  registerUser(user){
    return this._http.post('/register', user);
  }
  loginUser(user){
    return this._http.post('/login', user);
  }
}
