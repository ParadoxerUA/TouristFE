import {Component, OnInit, ViewChild, Injectable} from '@angular/core';
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {User} from '../user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class UserProfileComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) public userSideNav: MatSidenav;
  public user: User;


  logoutUser(): void {
    this.userService.userLogout()
      .subscribe(res => {
        this.userService.deleteSessionId();
      });
    this.userService.deleteSessionId();
    this.userService.setLoggedInUser(false);
    this.router.navigate(['/index']);

  }

  constructor(
      private userService: UserService,
      private router: Router,
  ){ }

  ngOnInit() {
    if(this.userService.userIsAuthorized()){
      this.userService.getUserProfile().subscribe(resp => {
        this.userService.updateUserProfile(resp.body);
        this.userService.setLoggedInUser(true);
      })
    }
    this.userService.setUserSideNav(this.userSideNav);
    this.user = new User('','', 0, '', '');
    this.userService.getEmittedValue()
        .subscribe(item => this.user=item);
  }

}
