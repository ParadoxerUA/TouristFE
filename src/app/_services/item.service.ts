import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject,  } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from './error.service';
import { BASE_URL } from './config';
import { Item } from '../trip';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private personalInventorySource = new BehaviorSubject(0)
  personalInventoryStatus = this.personalInventorySource.asObservable()

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorService: ErrorService,
  ) { }

  getTripItems(trip_id: number): Observable<any> {
    if (!this.personalInventorySource.getValue()) {
      const url = BASE_URL + `/trip/v1/trip/${trip_id}?fields=equipment`;
      let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
      return this.http.get(url, {headers: header})
      .pipe(
        catchError((err) => this.errorService.handleError(err, this.authService.getSessionId())))
      } else {
        const userId = this.personalInventorySource.getValue()
        const url = BASE_URL + `/user/v1/user?fields=personal_stuff,equipment&trip_id=${trip_id}&user_id=${userId}`;
        let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
        return this.http.get(url, {headers: header})
        .pipe(
          catchError((err) => this.errorService.handleError(err, this.authService.getSessionId())))
      }
    }

  addTripItem(itemData: Item): Observable<any> {
    const url = BASE_URL + `/equipment/v1/equipment`;
    let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
    return this.http.post(url, itemData, {headers: header})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

  deleteTripItem(equipment_id: number): Observable<any> {
    const url = BASE_URL + `/equipment/v1/equipment/${equipment_id}`;
    let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
    return this.http.delete(url, {headers: header})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

  togglePersonalInventory(userId) {
    if (userId === this.personalInventorySource.getValue()) {
      this.personalInventorySource.next(0)
    } else {
      this.personalInventorySource.next(userId)
    }
  }
}
