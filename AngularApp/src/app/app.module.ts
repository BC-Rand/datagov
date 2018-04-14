import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { MealsComponent } from './meals/meals.component';
import { HomeComponent } from './home/home.component';
=======
import { HealthcareComponent } from './healthcare/healthcare.component';
>>>>>>> healthcare component added


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    MealsComponent,
    HomeComponent
=======
    HealthcareComponent
>>>>>>> healthcare component added
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
