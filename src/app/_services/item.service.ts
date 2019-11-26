import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from './error.service';
import { BASE_URL } from './config';
import { Item } from '../trip';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

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

  getTripItems(trip_id: number): Observable<any> {
    const url = BASE_URL + `/trip/v1/trips/${trip_id}?fields=equipment`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

  addTripItem(itemData: Item): Observable<any> {
    const url = BASE_URL + `/equipment/v1/equipment`;
    return this.http.post(url, itemData, this.httpOptions)
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }
}
