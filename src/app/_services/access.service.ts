import { Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component'  
import { Router } from '@angular/router';
import {UserService} from "../_services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private baseLinks = ['/', '/index'];

  constructor(
    private router: Router,
    private header: HeaderComponent,
    private userService: UserService,
    ) { }

  checkUserAccess() {
    let currentLink = window.location.pathname;
    if(!this.userService.userIsAuthorized() && !this.baseLinks.includes(currentLink)){
      this.router.navigate(['index']);
      this.header.openSignInDialog();
      return false;
    }
    return true;
  }
}
