import { Injectable } from '@angular/core';
import {Trip, Checkpoint} from "src/app/trip";
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {UserService} from "./user.service";
import { BASE_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class TripService {
  public listOfCheckpoints : Checkpoint[] =[ {
    order_number: 1,
    latitude: 50.431273,
    longitude: 30.550139,
  }];

  public currentTrip: Trip = {
    name: 'Servise trip',
    start_date: 'Right now',
    description: 'inside service'
  };

  private tripUrl = BASE_URL + '/trip/v1/trip';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': this.userService.getSessionId()})
  };
  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  createTrip(name, startDate, endDate, description){
    this.currentTrip.name = name;
    this.currentTrip.start_date = startDate;
    this.currentTrip.end_date = endDate;
    this.currentTrip.description = description;
    this.currentTrip.points = this.listOfCheckpoints;
    this.addTrip(this.currentTrip).subscribe(g => {
      console.log(g)
    })
  }
  addCheckpointToList(lat,lng,orderNumber) {
    const newCheckpoint: Checkpoint = {order_number : orderNumber,
    latitude: lat,
    longitude: lng,};
    this.listOfCheckpoints.push(newCheckpoint);
  }

  deleteCheckpointFromList(deleteMarkerIndex)
  {
    this.listOfCheckpoints.splice(deleteMarkerIndex, 1);
    for (let _i = deleteMarkerIndex; _i < this.listOfCheckpoints.length; _i++) {
      this.listOfCheckpoints[_i].order_number--;
    }
  }

   addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripUrl, trip, this.httpOptions);
  }

  getTrips(): Observable<any> {
    const tripListUrl: string = `${BASE_URL}/trip/v1/trips_list`;
    console.log(tripListUrl);
    return this.http.get(tripListUrl, {
      headers: {'Authorization': this.userService.getSessionId()}
    }).pipe(
      map(data => data),
      catchError(
        error => {
          this.router.navigate(['error'])
          return of(error);
        }
      ));
  }
  updateTrip(trip_id, start_date, end_date, status): Observable<any> {
    const updateTripUrl = `${BASE_URL}/trip/v1/update/${trip_id}`;
    let trip = {
      start_date,
      end_date,
      status
    };
    return this.http.post(updateTripUrl, trip, this.httpOptions);
  }
}
