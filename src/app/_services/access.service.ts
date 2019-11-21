import { Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component'  
import { Router } from '@angular/router';
import {UserService} from "../_services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private baseLinks = ['/', '/index'];
  private accessStatus = false;

  constructor(
    private router: Router,
    private header: HeaderComponent,
    private userService: UserService,
    ) { }

  private userHasAccess() {
    let currentLink = window.location.pathname;
    console.log(this.userService.loggedIn);
    if(!this.userService.userIsAuthorized() && 
    (!this.baseLinks.includes(currentLink) || this.userService.loggedIn)){
      this.userService.loggedIn = false;  
      this.router.navigate(['index']);
      this.header.openSignInDialog();
      return false;
    }
    return true;
  }

  private setUpTimer(){
    let root = this;
    let timer;
    let userHasAccess = false;
    (function test(){
      root.accessStatus = root.userHasAccess();
      timer = setTimeout(test, 1000);
      if(!root.accessStatus){
        clearTimeout(timer);
      }
    })();
  }

  checkUserAccess() {
    this.setUpTimer();
    return this.accessStatus;
  }
}
