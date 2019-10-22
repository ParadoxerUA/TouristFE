import { Component, OnInit } from '@angular/core';
import {Trip} from '../trip';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-create-trip-page',
  templateUrl: './create-trip-page.component.html',
  styleUrls: ['./create-trip-page.component.css']
})
export class CreateTripPageComponent implements OnInit {


  TripName = new FormControl();
  TripDescription = new FormControl();
  StartDate = new FormControl((new Date()).toISOString());
  EndDate = new FormControl((new Date()).toISOString());

  trip: Trip = {
    id: 1,
    name: 'Mountains',
    startDate: '11/09/2019',
    endDate: '13/09/2019',
    description: 'No dogs allowed'
  };
  constructor(
      ) { }

  create_trip()
  {
    alert("Not implemented yet");
    console.log(this.TripName.value);
    console.log(this.StartDate.value);
    console.log(this.EndDate.value);
    console.log(this.TripDescription.value);

  }
  ngOnInit() {
  }

}
