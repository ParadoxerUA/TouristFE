import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { BASE_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': this.userService.getSessionId()})
  };

  getTripRoles(trip_id: number): Observable<any> {
    const url = BASE_URL + `/trip/v1/trips/${trip_id}/roles`;
    return this.http.get(url, this.httpOptions);
  }

  addTripRole(data, trip_id: number){
    const url = BASE_URL + `/trip/v1/trips/${trip_id}/roles`;
    return this.http.post(url, data, this.httpOptions)
  }
}
