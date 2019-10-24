import { Injectable } from '@angular/core';
import {Trip, Checkpoint} from "./trip";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  public listOfCheckpoints : Checkpoint[] =[ {
    orderNumber: 1,
    latitude: 50.431273,
    longitude: 30.550139,
  }];
  public currentTrip: Trip = {
    name: 'Servise trip',
    startDate: 'Right now',
    description: 'inside service'
  };
  // private backendUrl = 'http://localhost/be';
  private tripUrl = '/api/trip/v1/create_trip';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  createTrip(name, startDate, endDate, description){
    this.currentTrip.name = name;
    this.currentTrip.startDate = startDate;
    this.currentTrip.endDate = endDate;
    this.currentTrip.description = description;
    this.currentTrip.listOfPoints = this.listOfCheckpoints;
    this.addTrip(this.currentTrip).subscribe(g => {
      console.log(g)
    })
  }
  addCheckpointToList(lat,lng,orderNumber) {
    const newCheckpoint: Checkpoint = {orderNumber : orderNumber,
    latitude: lat,
    longitude: lng,};
    this.listOfCheckpoints.push(newCheckpoint);
  }

  deleteCheckpointFromList(deleteMarkerIndex)
  {
    this.listOfCheckpoints.splice(deleteMarkerIndex, 1);
    for (let _i = deleteMarkerIndex; _i < this.listOfCheckpoints.length; _i++) {
      this.listOfCheckpoints[_i].orderNumber--;
    }
  }

   addTrip(trip: Trip): Observable<Trip> {
    // console.log("trip in addTrip", this.http.post<Trip>(this.backendUrl+this.tripUrl, trip, this.httpOptions).pipe());
    return this.http.post<Trip>(this.tripUrl, trip, this.httpOptions);
  }

}
