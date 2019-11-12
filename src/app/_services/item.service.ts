import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { BASE_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userService.getSessionId()})
  };

  getTripItems(trip_id: number): Observable<any> {
    const url = BASE_URL + `/trip/v1/trip/${trip_id}?fields=equipment`;
    return this.http.get(url, this.httpOptions);
  }
}
