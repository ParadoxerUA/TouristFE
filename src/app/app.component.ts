import { Component, OnInit } from '@angular/core';
import { AccessService } from './_services/access.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'touristfe';

  constructor(
    private accessService: AccessService,
  ) {  }

  ngOnInit() {
    this.accessService.checkUserAccess();  
  }
}
