import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateTripPageComponent } from './create-trip-page/create-trip-page.component';
import { AgmCoreModule} from '@agm/core';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CreateTripPageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBNlwQE0tQLMQbsUEvf-KRc1gxzP6-KXsQ'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
