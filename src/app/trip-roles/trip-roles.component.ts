import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RoleService } from '../_services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { NewRolePopUpComponent } from '../new-role-pop-up/new-role-pop-up.component';
import { Role, Trip } from '../trip';

@Component({
  selector: 'app-trip-roles',
  templateUrl: './trip-roles.component.html',
  styleUrls: ['./trip-roles.component.css']
})
export class TripRolesComponent implements OnInit {
  @Input() trip: Trip;
  tripRoles: Role[] = [];
  name: string;
  color: string;
  activeRole: number = 0
  @Output() roleEvent = new EventEmitter<any>()

  constructor( 
    private dialog: MatDialog,
    private roleService: RoleService
  ) { }

  getRoles() {
    this.roleService.getTripRoles(this.trip.trip_id)
      .subscribe(response => {
        console.log(response);
        response.data.forEach(element => 
          this.tripRoles.push(element as Role));
      });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(NewRolePopUpComponent, {
        width: '350px',
        height: '500px',
        data: {name: this.name, color: this.color}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log(result);
          result.trip_id = this.trip.trip_id;
          this.addRole(result);
          this.tripRoles.push(result);
        }
      });
    }

  addRole(data): void {
    this.roleService.addTripRole(data)
    .subscribe();
  }

  activateRole(roleId) {
    if (roleId === this.activeRole) {this.activeRole = 0}
    else {this.activeRole = roleId}
    this.roleEvent.emit(this.activeRole)
  }

  ngOnInit() {
    this.getRoles();
  }

}
