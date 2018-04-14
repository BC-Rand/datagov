import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  registerUser(newUser) {
    return this._http.post('/register', newUser);
  }
  loginUser(user) {
    return this._http.post('/login', user);
  }
  getSessionId() {
    return this._http.get('/sessionId');
  }
  getAllBikes() {
    return this._http.get('/bicycles');
  }
  addBikeListing(bicycle) {
    return this._http.post('/bicycles', bicycle);
  }
  getUsersBicycles(id) {
    let targetString = "/bicycles/user/" + id;
    console.log("httpService getUsersBicycles(id) targetString: " + targetString);
    return this._http.get(targetString);
  }
  updateBicycle(id, bicycle) {
    let targetString = "/bicycles/edit/" + id;
    console.log("httpService updateBicycle(id, bicycle) targetString: " + targetString);
    console.log("Bicycle: ",bicycle);
    return this._http.put(targetString, bicycle);
  }
  deleteBicycle(id) {
    let targetString = "/bicycles/" + id;
    console.log("httpService deleteBicycle(id) targetString: " + targetString);
    return this._http.delete(targetString);
  }
}
