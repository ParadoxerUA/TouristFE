import { Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../user";
import { CookieService } from 'ngx-cookie-service'
import { BASE_URL } from './config'
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = BASE_URL + '/user/v1/register';
  private smokeUrl = BASE_URL + '/smoke/v1/smoke';
  private loginUrl = BASE_URL + '/user/v1/login';
  private socialLoginUrl = BASE_URL + '/user/v1/social_login';
  private confirmationUrl = BASE_URL + '/otc/v1/otc/';
  logoutUrl = BASE_URL + '/user/v1/logout';
  userProfileUrl = BASE_URL + '/user/v1/user-profile';

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
    return this.http.get(this.confirmationUrl + uuid)
  }

  postCredentials(data): Observable<any> {
    return this.http.post(this.registerUrl, data)
    .pipe(
      retry(1),
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
      retry(1),
      catchError(this.handleError)
    );
  }

  userLogout(): Observable<any> {
    let header = new HttpHeaders({'Authorization': this.cookieService.get('sessionId')});
    return this.http.post(this.logoutUrl, null, {headers: header, observe: 'response'});
  }

  getUserProfile() {
    let header = new HttpHeaders({'Authorization': this.cookieService.get('sessionId')});
    return this.http.get(this.userProfileUrl, {headers: header, observe: 'response'})
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
    this.cookieService.set('sessionId', sessionId);
  }

  userIsAuthorized(): boolean {
    return this.cookieService.check('sessionId');
  }

  deleteSessionId() {
    this.cookieService.delete('sessionId');
  }

  getSessionId() {
    return this.cookieService.get('sessionId');
  }

  setUserSideNav(sideNav: MatSidenav){
    this.userSideNav = sideNav;
  }

  toggleUserProfile(){
    this.userSideNav.toggle();
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) { }


}

