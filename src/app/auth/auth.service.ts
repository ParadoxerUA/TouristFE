import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BASE_URL } from '../_services/config'
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../_services/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = BASE_URL + '/user/v1/login';
  private socialLoginUrl = BASE_URL + '/user/v1/login/social';
  private logoutUrl = BASE_URL + '/user/v1/logout';
  private sessionTimeout;
  private day = 1000 * 60 * 60 * 24;

  userLogin(data, type?): Observable<any> {
    let loginUrl;

    if(type === undefined){
      loginUrl = this.loginUrl;
    } else {
      loginUrl = this.socialLoginUrl;
    }

    return this.http.post(loginUrl, data, {observe: 'response'})
    .pipe(
      catchError(this.errorService.handleError.bind(this))
    );
  }

  userLogout(): Observable<any> {
    let header = new HttpHeaders({'Authorization': localStorage.getItem('sessionId')});
    return this.http.post(this.logoutUrl, null, {headers: header, observe: 'response'})
    .pipe(
      catchError(this.errorService.handleError.bind(this))
    );
  }

  private clearSession(){
    this.deleteSessionId();
    window.location.reload();
  }

  setSessionId(sessionId) {
    localStorage.setItem('sessionId', sessionId);
    // Set timeout to clear sessionId after 24 hours
    this.sessionTimeout = setTimeout(this.clearSession.bind(this), this.day);
  }

  userIsAuthorized(): boolean {
    return localStorage.getItem('sessionId') !== null;
  }

  deleteSessionId() {
    clearTimeout(this.sessionTimeout);
    return localStorage.removeItem('sessionId');
  }

  getSessionId() {
    return localStorage.getItem('sessionId');
  }

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    ) { }
}
