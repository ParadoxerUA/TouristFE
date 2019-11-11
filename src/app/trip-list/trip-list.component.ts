import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { TripService } from '../_services/trip.service';
import { Trip } from '../trip';
import { Router } from '@angular/router';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  today: Date = new Date();
  trips: Trip[] = [];
  status = new FormControl();
  tripsDataSource = new MatTableDataSource(this.trips);
  current_editable: number = null;
  startDate = new FormControl((new Date()));
  endDate = new FormControl((new Date()));
  displayedColumns: string[] = [
    'admin',
    'name',
    'participants',
    'status',
    'start_date',
    'end_date',
    'action'
  ];
  admin_trips: {[id: number]: boolean;} = {};

  constructor(private tripService: TripService, private router: Router) { }

  ngOnInit() {
    this.getTrips();
  }
  getOtherStatus(status) {
    if (status == 'Open') {
      return 'Closed';
    }
    return 'Open';
  }
  getTrips(): void {
    this.tripService.getTrips()
    .subscribe(trips => {
      console.log(trips)
      trips.data.forEach(element => {
        this.trips.push(element as Trip);
        if (element['admin'] == '*') {
          this.admin_trips[element['id']] = true;
        }
      });
      this.tripsDataSource.data = this.trips;
    })
  }
  redirectToTripDetail(id): void {
    if (this.current_editable != null) {
      return;
    }
    // this.router.navigate(`trip_detail/${id}`);
    console.log(id);
  }
  redirectToCreateTrip(): void {
    this.router.navigate(['create_trip']);
  }
  isCurrentUserAdmin(admin): boolean {
    return admin == '*';
  }
  handleElement(trip) {
    this.startDate.setValue(new Date(trip.start_date));
    this.endDate.setValue(new Date(trip.end_date));
    this.status.setValue(trip.status);
    this.current_editable = trip.id;
    this.admin_trips[trip.id] = !this.admin_trips[trip.id];
  }
  isUneditable(id) {
    if (id in this.admin_trips) {
      return this.admin_trips[id];
    }
    return true;
  }
  isAvailableToEdit(id) {
    if (this.current_editable == null) {
      return true;
    }
    if (this.current_editable == id) {
      return true;
    }
    return false;
  }
  commitChanges(trip) {
    this.current_editable = null;
    this.admin_trips[trip.id] = !this.admin_trips[trip.id];

    this.startDate.value.setMinutes((this.startDate.value.getMinutes() - this.startDate.value.getTimezoneOffset()));
    this.endDate.value.setMinutes((this.endDate.value.getMinutes() - this.endDate.value.getTimezoneOffset()));

    this.tripService.updateTrip(trip.id, this.startDate.value, this.endDate.value, this.status.value).subscribe(
      response => {
        if(response.data == 'trip updated') {
          trip.start_date = this.startDate.value;
          trip.end_date = this.endDate.value;
          trip.status = this.status.value;
        }
      }
    )
  }
  cancelChanges(id) {
    this.current_editable = null;
    this.admin_trips[id] = !this.admin_trips[id];
  }
  isDisabled(): boolean {
    return Boolean(this.current_editable);
  }
}
