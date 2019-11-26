import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from './error.service';
import { BASE_URL } from './config'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorService: ErrorService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': this.authService.getSessionId()})
  };

  getTripRoles(trip_id: number): Observable<any> {
    const url = BASE_URL + `/trip/v1/trips/${trip_id}/roles`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

  addTripRole(data, trip_id: number){
    const url = BASE_URL + `/trip/v1/trips/${trip_id}/roles`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }
}
