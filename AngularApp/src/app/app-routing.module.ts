import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MealsComponent } from './meals/meals.component';
import { BenTestComponent } from './ben-test/ben-test.component';

const routes: Routes = [
  { path: 'meals', component: MealsComponent },
  { path: '', pathMatch: "full", component: HomeComponent },
  { path: 'test', component: BenTestComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
    