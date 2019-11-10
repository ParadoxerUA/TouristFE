import { Component, Input, OnInit } from '@angular/core';
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


  ngOnInit() {
    this.getRoles();
  }

}
