import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registerUrl = 'http://localhost:5000/api/user/v1/register'
  smokeUrl = 'http://localhost:5000/api/smoke/v1/smoke'

  postCredentials(data) {
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
