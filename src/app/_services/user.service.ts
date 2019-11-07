import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { debugUrl, prodUrl } from './config'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = debugUrl;
  private registerUrl = this.baseUrl + '/user/v1/register'
  private smokeUrl = this.baseUrl + '/smoke/v1/smoke'
  private loginUrl = this.baseUrl + '/user/v1/login'
  private socialLoginUrl = this.baseUrl + '/user/v1/social_login'
  private confirmationUrl = this.baseUrl + '/otc/v1/reg_confirmation/'

  uuidConfirmation(uuid) {
    return this.http.get(this.confirmationUrl + uuid)
  }

  postCredentials(data): Observable<any> {
    return this.http.post(this.registerUrl, data)
  }

  userLogin(data): Observable<any> {
    return this.http.post(this.loginUrl, data, {observe: 'response'})
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

  getSessionId() {
    return this.cookieService.get('sessionId');
  }

  deleteSessionId() {
    this.cookieService.delete('sessionId');
  }
    
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }
}
