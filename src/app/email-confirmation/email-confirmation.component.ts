import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'

import {UserService} from '../_services/user.service'


@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      userService.uuidConfirmation(params.uuid).subscribe()
    })
  }
  // tofix, doesnt redirect for some reasone
  ngOnInit() {
    this.router.navigate(['trip-list'])
  }

}
