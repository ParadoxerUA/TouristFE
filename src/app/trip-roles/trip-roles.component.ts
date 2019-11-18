import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RoleService } from '../_services/role.service';
import { Role, Trip } from '../trip';

@Component({
  selector: 'app-trip-roles',
  templateUrl: './trip-roles.component.html',
  styleUrls: ['./trip-roles.component.css']
})
export class TripRolesComponent implements OnInit {
  @Input() trip: Trip;
  tripRoles: Role[] = [];
  activeRole: number = 0
  @Output() roleEvent = new EventEmitter<any>()

  constructor( 
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

  activateRole(roleId) {
    if (roleId === this.activeRole) {this.activeRole = 0}
    else {this.activeRole = roleId}
    this.roleEvent.emit(this.activeRole)
  }

  ngOnInit() {
    this.getRoles();
  }

}
