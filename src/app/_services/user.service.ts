import { Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../user";
import { BASE_URL } from './config'
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = BASE_URL + '/user/v1/user';
  private loginUrl = BASE_URL + '/user/v1/login';
  private socialLoginUrl = BASE_URL + '/user/v1/login/social';
  private confirmationUrl = BASE_URL + '/otc/v1/otc/';
  private logoutUrl = BASE_URL + '/user/v1/logout';

  @Output() userDataEmitter: EventEmitter<any> = new EventEmitter();

  userSideNav: MatSidenav;

  setUserProfile(user){
    this.userDataEmitter.emit(user.data);
  }

  refreshUser(){
    if(this.userIsAuthorized()){
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
    return this.http.post(this.userUrl, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  userLogin(data, type?): Observable<any> {
    let loginUrl;

    if(type === undefined){
      loginUrl = this.loginUrl;
    } else {
      loginUrl = this.socialLoginUrl;
    }

    return this.http.post(loginUrl, data, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }

  userLogout(): Observable<any> {
    let header = new HttpHeaders({'Authorization': localStorage.getItem('sessionId')});
    return this.http.post(this.logoutUrl, null, {headers: header, observe: 'response'});
  }

  getUserProfile() {
    let header = new HttpHeaders({'Authorization': localStorage.getItem('sessionId')});
    return this.http.get(this.userUrl, {headers: header, observe: 'response'})
  }

  updateCapacity(capacity): Observable<any> {
    let header = new HttpHeaders({'Authorization': localStorage.getItem('sessionId')});
    const url = BASE_URL + `/user/v1/user-profile`;
    return this.http.patch(url, capacity, {headers: header, observe: 'response'});
  }

  handleError(error){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.data}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  setSessionId(sessionId) {
    localStorage.setItem('sessionId', sessionId);
  }

  userIsAuthorized(): boolean {
    return localStorage.getItem('sessionId') !== null;
  }

  deleteSessionId() {
    return localStorage.removeItem('sessionId');
  }

  getSessionId() {
    return localStorage.getItem('sessionId');
  }
  
  setUserSideNav(sideNav: MatSidenav){
    this.userSideNav = sideNav;
  }

  toggleUserProfile(){
    this.userSideNav.toggle();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


}

