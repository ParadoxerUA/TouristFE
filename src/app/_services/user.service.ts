import { Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../user";
import { CookieService } from 'ngx-cookie-service'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUrl = 'http://localhost:5000/api/user/v1/register';
  smokeUrl = 'http://localhost:5000/api/smoke/v1/smoke';
  loginUrl = 'http://localhost:5000/api/user/v1/login';
  confirmationUrl = 'http://localhost:5000/api/otc/v1/reg_confirmation/';
  logoutUrl = 'http://localhost:5000/api/user/v1/logout';
  userProfileUrl = 'http://localhost:5000/api/user/v1/user-profile';
  socialLoginUrl = '/be/api/user/v1/social_login'
  @Output() em: EventEmitter<any> = new EventEmitter();

  private isUserLoggedIn: boolean = false;
  sessionId: string;
  userSideNav: MatSidenav;

  public setLoggedInUser(flag) {
    this.isUserLoggedIn= flag;
  }


  public getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  change(user){
    this.em.emit(user.data);
  }

  getEmittedValue(){
    return this.em;
  }


  uuidConfirmation(uuid) {
    return this.http.get(this.confirmationUrl + uuid)
  }

  postCredentials(data): Observable<any> {
    return this.http.post(this.registerUrl, data)
  }

  userLogin(data): Observable<any> {
    return this.http.post(this.loginUrl, data, {observe: 'response'})
  }


  userLogout(): Observable<any> {
    let header = new HttpHeaders({'Authorization': this.sessionId});
    return this.http.post(this.logoutUrl, null, {headers: header, observe: 'response'});
  }

  getUserProfile() {
    let header = new HttpHeaders({'Authorization': this.sessionId});
    return this.http.get<User>(this.userProfileUrl, {headers: header, observe: 'response'});
  }

  
  userSocialLogin(data): Observable<any> {
    return this.http.post(this.socialLoginUrl, data, {observe: 'response'})
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
  ) { }


}

