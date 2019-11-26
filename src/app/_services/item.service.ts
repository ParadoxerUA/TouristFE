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

  getTripItems(trip_id: number): Observable<any> {
    const url = BASE_URL + `/trip/v1/trips/${trip_id}?fields=equipment`;
    let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
    return this.http.get(url, {headers: header})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

  addTripItem(itemData: Item): Observable<any> {
    const url = BASE_URL + `/equipment/v1/equipment`;
    let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
    return this.http.post(url, itemData, {headers: header})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }
}
