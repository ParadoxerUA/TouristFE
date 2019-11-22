import { Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {MatSidenav} from "@angular/material/sidenav";
import { BASE_URL } from './config'
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = BASE_URL + '/user/v1/register';
  private confirmationUrl = BASE_URL + '/otc/v1/otc/';
  userProfileUrl = BASE_URL + '/user/v1/user-profile';

  @Output() userDataEmitter: EventEmitter<any> = new EventEmitter();

  userSideNav: MatSidenav;

  setUserProfile(user){
    this.userDataEmitter.emit(user.data);
  }

  refreshUser(){
    if(this.authService.userIsAuthorized()){
      this.getUserProfile().subscribe(resp => {
        this.setUserProfile(resp.body);
      });
    }
  }

  getEmittedValue(){
    return this.userDataEmitter;
  }

  uuidConfirmation(uuid) {
    return this.http.patch(this.confirmationUrl + uuid, null);
  }

  postCredentials(data): Observable<any> {
    return this.http.post(this.registerUrl, data)
    .pipe(
      catchError(this.errorService.handleError)
    );
  }

  getUserProfile() {
    let header = new HttpHeaders({'Authorization': localStorage.getItem('sessionId')});
    return this.http.get(this.userProfileUrl, {headers: header, observe: 'response'})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }

  updateCapacity(capacity): Observable<any> {
    let header = new HttpHeaders({'Authorization': localStorage.getItem('sessionId')});
    const url = BASE_URL + `/user/v1/user-profile`;
    return this.http.patch(url, capacity, {headers: header, observe: 'response'})
    .pipe(
      catchError((err) => this.errorService.handleError(err, this.authService.getSessionId()))
    );
  }
  
  setUserSideNav(sideNav: MatSidenav){
    this.userSideNav = sideNav;
  }

  toggleUserProfile(){
    this.userSideNav.toggle();
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorService: ErrorService,
  ) { }


}

