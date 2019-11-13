import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { UserService } from './user.service';
import { BASE_URL } from './config'


@Injectable({
  providedIn: 'root'
})
export class TripUserService {

  private tripUrl = BASE_URL + '/trip/v1/trip'


  httpOptions = {
    headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': this.userService.getSessionId()})
  };

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  getTripUsers(trip_id): Observable<any> {
    const url = `${this.tripUrl}/${trip_id}?fields=users`
    return this.http.get(url, this.httpOptions)
    
  }

  deleteTripUser(trip_id, user_id): Observable<any> {
    const url = `${BASE_URL}/trip/v1/manage_trip/${trip_id}?user_id=${user_id}`;
    return this.http.delete(url, this.httpOptions);
  }

  
}
