import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule} from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module'
import { LoginPopUpComponent } from './login-pop-up/login-pop-up.component';
import { RegisterPopUpComponent } from './register-pop-up/register-pop-up.component';
import { MapComponent } from './map/map.component';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateTripPageComponent } from './create-trip-page/create-trip-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { TripDetailPageComponent } from './trip-detail-page/trip-detail-page.component';
import { TripItemListComponent } from './trip-item-list/trip-item-list.component';
import { TripUserListComponent } from './trip-user-list/trip-user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CreateTripPageComponent,
    MapComponent,
    LoginPopUpComponent,
    RegisterPopUpComponent,
    HeaderComponent,
    FooterComponent,
    EmailConfirmationComponent,
    TripDetailPageComponent,
    TripItemListComponent,
    TripUserListComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyBNlwQE0tQLMQbsUEvf-KRc1gxzP6-KXsQ'}),
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    LoginPopUpComponent,
    RegisterPopUpComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
