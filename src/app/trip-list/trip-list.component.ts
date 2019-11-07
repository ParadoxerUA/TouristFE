import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";

import { TripService } from '../_services/trip.service'
import { Trip } from '../trip'


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

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTrips()
    .subscribe(trips => {
      trips.data.forEach(element => {
        this.trips.push(element as Trip);
      });
      console.log(this.trips);
      this.tripsDataSource.data = this.trips;
    })
  }
}
