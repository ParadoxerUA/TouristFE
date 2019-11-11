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
    const url = BASE_URL + `/role/v1/role/${trip_id}`;
    return this.http.get(url, this.httpOptions);
  }

  // addTripRole(trip_id, data){
  //   const url = BASE_URL + `role/v1/role/${trip_id}`;
  //   return this.http.post(url, data, this.httpOptions)
  // }
}
