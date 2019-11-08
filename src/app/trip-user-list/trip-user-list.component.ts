import { Component, OnInit, Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { TripUserService } from '../_services/trip-user.service'
import { User } from '../user';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-user-list',
  templateUrl: './trip-user-list.component.html',
  styleUrls: ['./trip-user-list.component.css']
})
export class TripUserListComponent implements OnInit {

  tripUsers: User[];
  // trip_id = +this.route.snapshot.paramMap.get('trip_id');
  @Input() trip: Trip;
  constructor(
    // private route: ActivatedRoute,
    private tripUserService: TripUserService
  ) { 
    this.tripUsers = [];
  }

  getUsers(): void {
    
    this.tripUserService.getTripUsers(this.trip.id)
      .subscribe(response => {
        console.log(response);
        response.data.users.forEach(element => {
          this.tripUsers.push(element as User);
          console.log(element);
        });
      });
  }

  deleteUser(userToDelete: User): void {
    this.tripUsers = this.tripUsers.filter(user => user !== userToDelete);
    // delete user_id from trip below
    this.tripUserService.deleteTripUser(this.trip.id, userToDelete.id)
  }

  ngOnInit() {
    console.log(this.trip);
    this.getUsers();
  }

}
