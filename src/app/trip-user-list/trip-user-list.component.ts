import { Component, OnInit, Input } from '@angular/core';
import { TripUserService } from '../_services/trip-user.service';
import { User } from '../user';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-user-list',
  templateUrl: './trip-user-list.component.html',
  styleUrls: ['./trip-user-list.component.css']
})
export class TripUserListComponent implements OnInit {

  tripUsers: User[];
  @Input() trip: Trip;
  constructor(
    private tripUserService: TripUserService
  ) { 
    this.tripUsers = [];
  }

  getUsers(): void {
    this.tripUserService.getTripUsers(this.trip.trip_id)
      .subscribe(response => {
        response.data.users.forEach(element => {
          this.tripUsers.push(element as User);
        });
      });
  }

  deleteUser(userToDelete: User): void {
    this.tripUsers = this.tripUsers.filter(user => user !== userToDelete);
    // delete user_id from trip below
    this.tripUserService.deleteTripUser(this.trip.trip_id, userToDelete.id)
  }

  ngOnInit() {
    this.getUsers();
  }

}
