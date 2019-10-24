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
    id: 1,
    name: 'Mountains',
    description: 'No dogs allowed'
  };
  constructor(private tripService : TripService) { }

  create_trip()
  {
    alert("Not implemented yet");
    // this.tripService.currentTrip.name = this.TripName.value;
    // this.tripService.currentTrip.startDate = this.StartDate.value;
    // this.tripService.currentTrip.endDate = this.EndDate.value;
    // this.tripService.currentTrip.description = this.TripDescription.value;
    // this.tripService.currentTrip.description = this.TripDescription.value;
    // console.log(this.tripService.currentTrip);
    // this.tripService.createTrip();
  }
  ngOnInit() {
  }

  generate_checkpoints_list()
  {
    var checkpoints = {50.023313 : 30.233451};
    return {here_will_be : checkpoints};
  }
}
