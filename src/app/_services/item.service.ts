import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject,  } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from './error.service';
import { BASE_URL } from './config';
import { Item, Role } from '../trip';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private isPersonalInventorySource = new BehaviorSubject(false);
  isPersonalInventoryStatus = this.isPersonalInventorySource.asObservable();
  public selectedItemSource = new BehaviorSubject(null);
  public userItemsSource = new BehaviorSubject(null);
  selectedItem = this.selectedItemSource.asObservable();
  userItems = this.userItemsSource.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorService: ErrorService,
  ) { }

  selectNewItem(item: Item) {
    this.selectedItemSource.next(item);
  }
  addUserItems(items) {
    this.userItemsSource.next(items)
  }

  getTripItems(trip_id: number): Observable<any> {
    const url = BASE_URL + `/trip/v1/trip/${trip_id}?fields=equipment`;
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

  togglePersonalInventory() {
    let nextValue = !this.isPersonalInventorySource.getValue()
    this.isPersonalInventorySource.next(nextValue)
  }

  dispenseItems(dispensedItems, item_id): Observable<any> {
    const url = `${BASE_URL}/equipment/v1/equipment/${item_id}`;
    let header = new HttpHeaders({'Authorization': this.authService.getSessionId()});
    return this.http.patch(url, dispensedItems, {headers: header})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }
}
