import { Component, OnInit } from '@angular/core';
import {Trip} from '../trip';
import {FormControl} from "@angular/forms";
import {generate} from "rxjs";

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
    description: 'No dogs allowed'
  };
  constructor(
      ) { }

  create_trip()
  {
    alert("Not implemented yet");
    var body = { trip_name : this.TripName.value,
      start_date :  this.StartDate.value,
      end_date : this.EndDate.value,
      trip_description: this.TripDescription.value, checpoints : this.generate_checkpoints_list() };
    console.log(body);
  }
  ngOnInit() {
  }

  generate_checkpoints_list()
  {
    var checkpoints = {50.023313 : 30.233451};
    return {here_will_be : checkpoints};
  }
}
