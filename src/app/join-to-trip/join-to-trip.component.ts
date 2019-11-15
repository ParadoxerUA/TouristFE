import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'

import {TripService} from '../_services/trip.service'
import { AccessService } from '../_services/access.service';


@Component({
  selector: 'app-join-to-trip',
  templateUrl: './join-to-trip.component.html',
  styleUrls: ['./join-to-trip.component.css']
})
export class JoinToTripComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private tripService: TripService,
    public router: Router,
    private accessService: AccessService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      tripService.joinToTrip(params.trip_uuid).subscribe(res => {
        console.log(res)
        this.router.navigate(['trip-list'])
      })
    })
  }

  ngOnInit() {
    if(!this.accessService.checkUserAccess()){return};
  }

}
