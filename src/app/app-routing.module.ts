import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {CreateTripPageComponent} from "./create-trip-page/create-trip-page.component";

import {TripListComponent} from './trip-list/trip-list.component'
import {EmailConfirmationComponent} from './email-confirmation/email-confirmation.component';
import {TripDetailPageComponent} from './trip-detail-page/trip-detail-page.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: 'index', component: MainPageComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'create_trip', component: CreateTripPageComponent },
  { path: 'trip-list', component: TripListComponent },
  { path: 'email-confirmation', component: EmailConfirmationComponent },
  { path: 'trip_detail', component: TripDetailPageComponent },
  { path: 'error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
