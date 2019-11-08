import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { mockedUsers } from '../mock-trip-users';
import { DEBUG_URL, PROD_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class TripUserService {

  private baseUrl = DEBUG_URL
  private tripUserUrl = this.baseUrl + 'insert_url_later'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ) { }

  // getTripUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.tripUserUrl)
  // }

  getTripUsers(): Observable<User[]> {
    return of(mockedUsers)
  }

  
}
