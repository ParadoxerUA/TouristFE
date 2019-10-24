import { Component, OnInit } from '@angular/core';
import {Trip} from '../trip';
import {FormControl} from "@angular/forms";
import {generate} from "rxjs";
import {TripService} from "../trip.service";

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
    name: 'Mountains',
    description: 'description',
    start_date: 'immediately'
  };
  constructor(private tripService : TripService) { }

  create_trip()
  {
    this.tripService.createTrip(this.TripName.value, this.StartDate.value,
        this.EndDate.value, this.TripDescription.value );
    console.log("Trip on front", JSON.stringify(this.tripService.currentTrip) );
  }
  ngOnInit() {
  }

  generate_checkpoints_list()
  {
    var checkpoints = {50.023313 : 30.233451};
    return {here_will_be : checkpoints};
  }
}
