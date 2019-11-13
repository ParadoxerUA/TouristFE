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
  @Input() trip: Trip;
  @Input() currentUser: User;

  constructor(
    public dialog: MatDialog,
    private tripUserService: TripUserService,
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

  ngOnInit() {
    this.getUsers();
  }

}
