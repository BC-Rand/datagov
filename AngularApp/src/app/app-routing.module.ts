import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HealthcareComponent } from './healthcare/healthcare.component';

const routes: Routes = [
  {path: 'healthcare', component: HealthcareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
