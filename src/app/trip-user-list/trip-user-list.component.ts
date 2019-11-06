import { Component, OnInit } from '@angular/core';
import { TripUserService } from '../_services/trip-user.service'
import { User } from '../user';

@Component({
  selector: 'app-trip-user-list',
  templateUrl: './trip-user-list.component.html',
  styleUrls: ['./trip-user-list.component.css']
})
export class TripUserListComponent implements OnInit {

  tripUsers: User[];

  constructor(
    private tripUserService: TripUserService
  ) { }

  getUsers(): void {
    this.tripUserService.getTripUsers()
      .subscribe(users => this.tripUsers = users);
  }

  delete(userToDelete: User): void {
    this.tripUsers = this.tripUsers.filter(user => user !== userToDelete);
    // delete user_id from trip below
  }

  ngOnInit() {
    this.getUsers();
  }

}
