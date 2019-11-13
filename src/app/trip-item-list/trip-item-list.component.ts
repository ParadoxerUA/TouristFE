import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { ItemService } from '../_services/item.service';
import { Item, Trip } from '../trip';

@Component({
  selector: 'app-trip-item-list',
  templateUrl: './trip-item-list.component.html',
  styleUrls: ['./trip-item-list.component.css'],
})
export class TripItemListComponent implements OnInit {
  name: string;
  weight: number;
  quantity: number;

  @Input() trip: Trip;
  tripItems: Item[] = [];
  itemData: Item;
  itemsDataSource = new MatTableDataSource(this.tripItems);

  displayedColumns: string[] = ['name', 'weight', 'quantity'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private itemService: ItemService
  ) { }

  getItems() {
    this.itemService.getTripItems(this.trip.trip_id)
      .subscribe(response => {
        console.log(response);
        response.data.equipment.forEach(element =>
          this.tripItems.push(element as Item));

        this.itemsDataSource.data = this.tripItems;
      });
    }

  addItem(): void {
    this.itemData = {
      "name": this.name,
      "weight": this.weight,
      "quantity": this.quantity,
      "trip_id": this.trip.trip_id
    };

    this.name = "";
    this.weight = 0;
    this.quantity = 1;

    this.itemService.addTripItem(this.itemData)
    .subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit() {
    this.getItems();
    this.itemsDataSource.sort = this.sort;
  }

}
