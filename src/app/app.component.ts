import { Component, OnInit } from '@angular/core';
import { UserService } from './_services/user.service'
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'touristfe';
  private baseLinks = ['/', '/index'];

  constructor(
    private userService: UserService,
    private router: Router,
    private header: HeaderComponent
  ) {  }

  ngOnInit() { 
    let currentLink = window.location.pathname;
    if(!this.userService.userIsAuthorized() && !this.baseLinks.includes(currentLink)){
      this.router.navigate(['index']);
      this.header.openSignInDialog();
    }
  }
}
