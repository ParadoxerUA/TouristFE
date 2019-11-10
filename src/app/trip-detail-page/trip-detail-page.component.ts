import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../_services/trip.service';
import { Trip } from '../trip';
import {User} from "../user";

@Component({
  selector: 'app-trip-detail-page',
  templateUrl: './trip-detail-page.component.html',
  styleUrls: ['./trip-detail-page.component.css']
})
export class TripDetailPageComponent implements OnInit {
  trip: Trip;
  trip_id = +this.route.snapshot.paramMap.get('trip_id');

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute
  ) {

  }

  getTrip(): void {
    this.tripService.getTrip(this.trip_id)
      .subscribe(response => {
        this.trip = response.data as Trip;
      });
  }

  ngOnInit() {
    this.getTrip();
  }

}
