import { Component, OnInit } from '@angular/core';
import {Trip} from '../trip';

@Component({
  selector: 'app-create-trip-page',
  templateUrl: './create-trip-page.component.html',
  styleUrls: ['./create-trip-page.component.css']
})
export class CreateTripPageComponent implements OnInit {



  trip: Trip = {
    id: 1,
    name: 'Mountains',
    startDate: '11/09/2019',
    endDate: '13/09/2019',
    description: 'Highly recommended'
  };
  constructor(
      ) { }

  create_trip()
  {
    alert("Not implemented yet");
    console.log(this.trip);
  }
  ngOnInit() {
  }

}
