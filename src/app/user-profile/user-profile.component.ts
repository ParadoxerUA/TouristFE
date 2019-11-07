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
        console.log(res)
      });
    this.userService.deleteSessionId();
    this.router.navigate(['/index']);

  }

  constructor(
      private userService: UserService,
      private router: Router,
  ){ }

  ngOnInit() {
      this.userService.setUserSideNav(this.userSideNav);
      this.user = new User('','', 0, '', '');
      this.userService.getEmittedValue()
          .subscribe(item => this.user=item);
  }

}
