import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user;
  loginDisplayBool = false;

  toggleLoginDisplay() {
    this.loginDisplayBool = !this.loginDisplayBool;
    console.log(this.loginDisplayBool);
  }
  login() {

  }
}
