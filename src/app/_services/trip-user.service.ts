import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BASE_URL } from './config'
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class TripUserService {

  private tripUrl = BASE_URL + '/trip/v1/trips'


  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authService.getSessionId()}),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorService: ErrorService,
    ) { }

  getTripUsers(trip_id): Observable<any> {
    const url = `${this.tripUrl}/${trip_id}?fields=users`
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
    
  }

  deleteTripUser(trip_id, user_id): Observable<any> {
    const url = `${BASE_URL}/trip/v1/manage_trip/${trip_id}?user_id=${user_id}`;
    return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

  toggleRole(trip_id, role_id, user_id): Observable<any> {
    const url = `${BASE_URL}/trip/v1/trips/${trip_id}/roles/${role_id}/${user_id}`;
    return this.http.put(url, {}, {headers: this.httpOptions.headers, observe: 'response'})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

}
