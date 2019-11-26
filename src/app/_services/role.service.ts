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

  getTripRoles(trip_id: number): Observable<any> {
    const url = BASE_URL + `/role/v1/role/${trip_id}`;
    let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
    return this.http.get(url, {headers: header})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

  addTripRole(data){
    const url = BASE_URL + `/role/v1/role`;
    let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
    return this.http.post(url, data, {headers: header})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }
}
