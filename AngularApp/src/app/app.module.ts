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
>>>>>>> 1645cb80a2f1024a077b231ee0370a74af75f387
import { HealthcareComponent } from './healthcare/healthcare.component';


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    MealsComponent,
    HomeComponent,
=======
>>>>>>> 1645cb80a2f1024a077b231ee0370a74af75f387
    HealthcareComponent
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
