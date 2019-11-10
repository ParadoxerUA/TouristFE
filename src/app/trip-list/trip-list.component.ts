import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { TripService } from '../_services/trip.service';
import { Trip } from '../trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  tripsDataSource = new MatTableDataSource(this.trips);
  displayedColumns: string[] = [
    'admin',
    'name',
    'participants',
    'status',
    'start_date',
    'end_date',
  ];

  constructor(private tripService: TripService, private router: Router) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTrips()
    .subscribe(trips => {
      trips.data.forEach(element => {
        this.trips.push(element as Trip);
      });
      this.tripsDataSource.data = this.trips;
    })
  }
  redirectToTripDetail(id): void {  
    this.router.navigate([`trip_detail`, id]);
  }
  redirectToCreateTrip(): void {
    this.router.navigate(['create_trip']) 
  }
  isCurrentUserAdmin(admin): boolean {
    return admin == '*';
  }
}
