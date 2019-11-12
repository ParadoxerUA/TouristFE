import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { ItemService } from '../_services/item.service';
import { Item, Trip } from '../trip';

@Component({
  selector: 'app-trip-item-list',
  templateUrl: './trip-item-list.component.html',
  styleUrls: ['./trip-item-list.component.css'],
})
export class TripItemListComponent implements OnInit {
  @Input() trip: Trip;
  tripItems: Item[] = [];
  itemsDataSource = new MatTableDataSource(this.tripItems);

  displayedColumns: string[] = ['name', 'weight', 'quantity'];

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

  ngOnInit() {
    this.getItems();
  }

}
