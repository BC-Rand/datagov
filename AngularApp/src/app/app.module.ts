import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MealsComponent } from './meals/meals.component';
import { HomeComponent } from './home/home.component';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { BenTestComponent } from './ben-test/ben-test.component';

@NgModule({
  declarations: [
    AppComponent,
    MealsComponent,
    HomeComponent,
    HealthcareComponent,
    BenTestComponent
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
