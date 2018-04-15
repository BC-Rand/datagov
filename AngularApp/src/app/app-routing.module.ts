import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { MealsComponent } from './meals/meals.component';
import { HealthcareComponent } from './healthcare/healthcare.component';

const routes: Routes = [
  { path: '', pathMatch: "full", component: HomeComponent },
  {path: 'healthcare', component: HealthcareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
