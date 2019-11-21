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
  public listOfCheckpoints : Checkpoint[] =[ ];

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
      this.router.navigate(['trip-list']);
    })
  }
  addCheckpointToList(lat,lng,orderNumber) {
    const newCheckpoint: Checkpoint = {order_number : orderNumber,
    latitude: lat,
    longitude: lng,};
    this.listOfCheckpoints.push(newCheckpoint);
  }

  updateCheckpointList(markerList)
  {
    this.listOfCheckpoints = [];
    for(let counter = 0; counter < markerList.length; counter++ )
    {
      let newPoint = {order_number : counter+1,
        latitude: markerList[counter].lat,
        longitude: markerList[counter].lng};
      this.listOfCheckpoints.push(newPoint);
    }
  }


  addTrip(trip: Trip): Observable<Trip> {
    let header = new HttpHeaders({'Authorization': this.userService.getSessionId()});
    return this.http.post<Trip>(this.tripUrl, trip, {headers: header});
  }


  getTrip(trip_id: number): Observable<any> {
    let header = new HttpHeaders({'Authorization': this.userService.getSessionId()});
    const url = `${this.tripUrl}/${trip_id}`;
    return this.http.get(url, {headers: header})
  }


  getTrips(): Observable<any> {
    const tripListUrl: string = `${BASE_URL}/trip/v1/list`;
    return this.http.get(tripListUrl, {
      headers: {'Authorization': this.userService.getSessionId()}
    }).pipe(
      map(data => data));
  }
  updateTrip(trip_id, start_date, end_date, status): Observable<any> {
    const updateTripUrl = `${BASE_URL}/trip/v1/update/${trip_id}`;
    let trip = {
      start_date,
      end_date,
      status
    };
    return this.http.patch(updateTripUrl, trip, this.httpOptions);
  }

  refreshInviteLink(trip_id: number): Observable<any>  {
      const tripRefreshUrl: string = `${BASE_URL}/trip/v1/manage_trip/${trip_id}`;
      return this.http.patch(tripRefreshUrl, null,  {
          headers: {'Authorization': this.userService.getSessionId()}, observe: 'response'})
  }

  joinToTrip(trip_uuid): Observable<any> {
    const tripInviteUrl: string = `${BASE_URL}/otc/v1/otc/${trip_uuid}`
    return this.http.patch(tripInviteUrl, null, this.httpOptions)
  }
}
