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

  public tripForDetail: Trip = {
    name: '',
    start_date: '',
    points: []
  };

  public tripForDetailMap: Trip = {
    name: '',
    start_date: '',
    points: []
  };
  public tripDetailId = 0;
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

  getTrip(trip_id: number){
    console.log('get trip ', trip_id);
    if(trip_id == undefined){
      console.error('TripService#getTrip called with incorrect trip_id param. Value ='+trip_id);
      return this.tripForDetail;
    }
    if (this.tripDetailId != trip_id) {
      this.getTripFromBe(trip_id)
          .subscribe(response => {
            this.tripForDetail = response.data as Trip;
            console.log('taking from be', this.tripForDetail);
          });
      this.tripDetailId = trip_id;
    }
    if (this.tripForDetail.points==undefined || this.tripForDetail.points.length == 0)
    {
      this.getTripCheckpointsFromBe(trip_id)
          .subscribe(response => {
            this.tripForDetailMap = response.data as Trip;
          });
      this.tripForDetail.points = this.tripForDetailMap.points;
      console.log(this.tripForDetail);
    }
        return this.tripForDetail;
  }

  getTripCheckpointsFromBe(trip_id: number): Observable<any> {
    const url = `${this.tripUrl}/${trip_id}?fields=points`;
    return this.http.get(url, this.httpOptions)
  }

  getTripFromBe(trip_id: number): Observable<any> {
    const url = `${this.tripUrl}/${trip_id}`;
    return this.http.get(url, this.httpOptions)
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

}
