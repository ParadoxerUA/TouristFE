import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {CreateTripPageComponent} from "./create-trip-page/create-trip-page.component";

const routes: Routes = [
  { path: 'index', component: MainPageComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'create_trip', component: CreateTripPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
