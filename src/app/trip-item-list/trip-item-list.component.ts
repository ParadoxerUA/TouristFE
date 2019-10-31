import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-item-list',
  templateUrl: './trip-item-list.component.html',
  styleUrls: ['./trip-item-list.component.css']
})
export class TripItemListComponent implements OnInit {

  name: string;
  weight: number;
  amount: number;
  items = [];

  addItem() {
    this.items.push({name: this.name,
                     weight: this.weight,
                     amount: this.amount});
    this.name = '';
    this.weight = 0;
    this.amount = 0;
  }

  constructor() { }

  ngOnInit() {
  }

}
