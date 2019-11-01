import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {CreateTripPageComponent} from "./create-trip-page/create-trip-page.component";
import {EmailConfirmationComponent} from './email-confirmation/email-confirmation.component'
import {TripListComponent} from './trip-list/trip-list.component'

const routes: Routes = [
  { path: 'index', component: MainPageComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'create_trip', component: CreateTripPageComponent },
  {path: 'email-confirmation', component: EmailConfirmationComponent},
  {path: 'trip-list', component: TripListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
