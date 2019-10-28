import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registerUrl = 'http://localhost:5000/api/user/v1/register'
  smokeUrl = 'http://localhost:5000/api/smoke/v1/smoke'
  loginUrl = 'http://localhost:5000/api/user/v1/login'

  sessionId: string

  postCredentials(data): Observable<any> {
    return this.http.post(this.registerUrl, data)
  }

  userLogin(data): Observable<any> {
    return this.http.post(this.loginUrl, data, {observe: 'response'})
  }
  
  setSessionId(sessionId) {
    this.sessionId = sessionId
  }

  getSessionId() {
    return this.sessionId
  }
  

  
  constructor(
    private http: HttpClient
  ) { }
}
