import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TripService} from "../_services/trip.service";
import {User} from "../user";


@Component({
  selector: 'app-trip-detail-page',
  templateUrl: './trip-detail-page.component.html',
  styleUrls: ['./trip-detail-page.component.css']
})
export class TripDetailPageComponent implements OnInit {

  trip_id = +this.route.snapshot.paramMap.get('trip_id');
  constructor(
      private route: ActivatedRoute,
      private tripService: TripService
  ) { }



  get_trip(): void {

    this.tripService.getTripForMap(this.trip_id)
        .subscribe(response => {
          console.log(response)
        });
  }

  ngOnInit() {
  }

}
