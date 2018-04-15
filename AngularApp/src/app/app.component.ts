import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user;
  loginDisplayBool = false;
  registerDisplayBool = false;
  errors: any;

  existinguser = {username: "", password: ""}
  newuser = {username: "", password: "", PW_confirm: ""};

  constructor(private _httpService: HttpService){}

  toggleLoginDisplay() {
    this.loginDisplayBool = !this.loginDisplayBool;
    console.log(this.loginDisplayBool);
  }

  toggleRegisterDisplay() {
    this.errors = null;
    this.registerDisplayBool = !this.registerDisplayBool;
  }
  login() {
    this._httpService.loginUser(this.existinguser)
    .subscribe(data=>{
      if(data['message'] == "Success"){
        this.user = data['data'];
      }
      else{
        this.errors = "Please try again"
      }

    })
    this.toggleLoginDisplay();  
  }
  register(){
    if(this.newuser.password != this.newuser.PW_confirm){
      this.errors = "Passwords do not match"
    }
    if(this.newuser.password.length < 8){
      this.errors = "Password(s) needs to be at least 8 characters"
    }else{
      var observable = this._httpService.registerUser(this.newuser)
      .subscribe(data=>{
        if(data['message'] == "Success"){
          this.user = data['data'];
        }else{
          this.errors = "Username already exists"
        }
      })
    }
    this.toggleLoginDisplay();
  }
  logout(){
    this.user = null;
  }
}
