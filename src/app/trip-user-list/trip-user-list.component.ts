import { Component, OnInit, Input } from '@angular/core';
import { TripUserService } from '../_services/trip-user.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { User } from '../user';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-user-list',
  templateUrl: './trip-user-list.component.html',
  styleUrls: ['./trip-user-list.component.css']
})
export class TripUserListComponent implements OnInit {

  tripUsers: User[];
  activeRole: number = 0
  @Input() trip: Trip;
  @Input() currentUser: User;

  constructor(
    public dialog: MatDialog,
    private tripUserService: TripUserService,
  ) { 
    this.tripUsers = [];
  }

  getUsers(): void {
    this.tripUsers = []
    this.tripUserService.getTripUsers(this.trip.trip_id)
      .subscribe(response => {
        response.data.users.forEach(element => {
          let rolesList = element.roles.filter(role => role.trip_id === this.trip.trip_id)
          element.roles = rolesList.map(role => role.id)
          this.tripUsers.push(element as User);
        });
        console.log(this.tripUsers)
      });
  }

  deleteUser(userToDelete: User): void {
    this.tripUsers = this.tripUsers.filter(user => user !== userToDelete);
    // delete user_id from trip below
    this.tripUserService.deleteTripUser(this.trip.trip_id, userToDelete.user_id).subscribe();
    console.log(this.trip);
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      height: '150px',
      data: `Are you sure to remove ${user.name} from this trip?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.deleteUser(user);
      }
    });
  }

  recieveRole($event) {
    this.activeRole = $event
  }

  toggleRole(userId) {
    this.tripUserService.toggleRole(this.activeRole, userId)
      .subscribe(response => {
        console.log(response)
        this.getUsers()
      })
    console.log('roleId:' + this.activeRole + ' assigned to userId:' + userId)
  }

  ngOnInit() {
    this.getUsers();
  }

}
