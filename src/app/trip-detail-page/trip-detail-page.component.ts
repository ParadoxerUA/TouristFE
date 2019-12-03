import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../_services/trip.service';
import { UserService } from '../_services/user.service';
import { Role, Trip} from '../trip';
import { User} from "../user";

@Component({
  selector: 'app-trip-detail-page',
  templateUrl: './trip-detail-page.component.html',
  styleUrls: ['./trip-detail-page.component.css']
})
export class TripDetailPageComponent implements OnInit {
  trip: Trip;
  trip_id = +this.route.snapshot.paramMap.get('trip_id');
  readyToRefresh: boolean = true;
  currentUser: User;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  getTrip(): void {
    this.tripService.getTrip(this.trip_id)
      .subscribe(response => {
        this.trip = response.data as Trip;
      });
  }


  refreshInviteLink(trip_id : number): void {
      this.readyToRefresh = false;
      this.tripService.refreshInviteLink(trip_id).subscribe(response => {
          this.trip.trip_uuid = response.body["data"];
          this.readyToRefresh = true;
        });
  }

  ngOnInit() {
    this.getTrip();
    this.userService.getUserProfile()
    .subscribe(response =>
      this.currentUser = response.body["data"]
      );
  }
}
