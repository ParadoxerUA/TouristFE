import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registerUrl = 'http://localhost:5000/api/user/v1/register'
  smokeUrl = 'http://localhost:5000/api/smoke/v1/smoke'

  postCredentials(data): Observable<any> {
    return this.http.post(this.registerUrl, data)
  }

  // To delete
  getSmoke() {
    return this.http.get(this.smokeUrl)
  }

  
  constructor(
    private http: HttpClient
  ) { }
}
