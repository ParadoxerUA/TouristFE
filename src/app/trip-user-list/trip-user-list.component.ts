import { Component, OnInit, Input } from '@angular/core';
import { TripUserService } from '../_services/trip-user.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { User } from '../user';
import { Trip, Role } from '../trip';

@Component({
  selector: 'app-trip-user-list',
  templateUrl: './trip-user-list.component.html',
  styleUrls: ['./trip-user-list.component.css']
})
export class TripUserListComponent implements OnInit {

  tripUsers: User[];
  tripRoles: Role[]
  activeRole: number = 0
  activeRoleColor: string = 'white'
  @Input() trip: Trip;
  @Input() currentUser: User;

  constructor(
    public dialog: MatDialog,
    private tripUserService: TripUserService,
  ) {}

  getUsers(): void {
    this.tripUsers = []
    this.tripRoles = []
    this.tripUserService.getTripUsers(this.trip.trip_id)
      .subscribe(response => {
        response.data.users.forEach(element => {
          this.getRolesFromUser(element)
          let rolesList = element.roles.filter(role => role.trip_id === this.trip.trip_id)
          element.roles = rolesList.map(role => role.id)
          this.tripUsers.push(element as User);
        });
        console.log(this.tripUsers)
        console.log(this.tripRoles)
      });
  }

  getRolesFromUser(user) {
    user.roles.forEach(role => {
      if (!this.tripRoles.includes(role)) {this.tripRoles.push(role)}
    })
  }

  getRoleColor(roleId) {
    let color = 'white'
    this.tripRoles.forEach(role => {
      if (role.id === roleId) {color = role.color}
    })
    return color
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
    this.activeRoleColor = this.getRoleColor($event)
  }

  toggleRole(userId) {
    this.tripUserService.toggleRole(this.trip.trip_id, this.activeRole, userId)
      .subscribe(response => {
        if (response.status === 201) {
          this.toggleRoleLocaly(userId, this.activeRole)
        }
      })
  }

  toggleRoleLocaly(userId, roleId) {
    this.tripUsers.forEach(user => {
      if (user.user_id === userId) {
        let index = user.roles.indexOf(roleId)
        if (index > -1) {
          user.roles.splice(index, 1)
        } else {
          user.roles.push(roleId)
        }
      }
    })
  }

  ngOnInit() {
    this.getUsers();
  }

}
