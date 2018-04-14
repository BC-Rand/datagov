import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HealthcareComponent } from './healthcare/healthcare.component';

<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import { MealsComponent } from './meals/meals.component';

const routes: Routes = [
  { path: '', pathMatch: "full", component: HomeComponent }
=======
const routes: Routes = [
  {path: 'healthcare', component: HealthcareComponent}
>>>>>>> healthcare component added
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
