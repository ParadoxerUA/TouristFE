import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripUserService } from '../_services/trip-user.service'
import { User } from '../user';

@Component({
  selector: 'app-trip-user-list',
  templateUrl: './trip-user-list.component.html',
  styleUrls: ['./trip-user-list.component.css']
})
export class TripUserListComponent implements OnInit {

  tripUsers: User[];
  trip_id = +this.route.snapshot.paramMap.get('trip_id');

  constructor(
    private route: ActivatedRoute,
    private tripUserService: TripUserService
  ) { 
    this.tripUsers = [];
  }

  getUsers(): void {
    
    this.tripUserService.getTripUsers(this.trip_id)
      .subscribe(response => {
        console.log(response);
        response.data.users.forEach(element => {
          this.tripUsers.push(element as User);
          console.log(element);
        });
      });
  }

  delete(userToDelete: User): void {
    this.tripUsers = this.tripUsers.filter(user => user !== userToDelete);
    // delete user_id from trip below
  }

  ngOnInit() {
    this.getUsers();
  }

}
