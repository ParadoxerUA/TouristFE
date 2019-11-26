import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { ItemService } from '../_services/item.service';
import { Item, Trip } from '../trip';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-trip-item-list',
  templateUrl: './trip-item-list.component.html',
  styleUrls: ['./trip-item-list.component.css'],
})
export class TripItemListComponent implements OnInit {
  name: string;
  weight: number;
  quantity: number;

  itemName = new FormControl('', [Validators.required, Validators.pattern("[a-z]+"), Validators.minLength(3)]);
  itemWeight = new FormControl('', [Validators.required, Validators.pattern("([0-9]*[.])?[0-9]+")]);
  itemQuantity = new FormControl('', [Validators.required, Validators.pattern("[1-9]|10+")]);

  @Input() trip: Trip;
  tripItems: Item[] = [];
  itemData: Item;
  itemsDataSource = new MatTableDataSource(this.tripItems);
  isPersonalInventory: Boolean

  displayedColumns: string[] = ['name', 'weight', 'quantity'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private itemService: ItemService
  ) { }

  getNameErrorMessage() {
    return this.itemName.hasError('required') ? 'Enter a value' :
        this.itemName.hasError('pattern') ? 'Only lowercase letters' :
        this.itemName.hasError('minlength') ? 'Min length 3 characters' :
            '';
  }

  getWeightErrorMessage() {
    return this.itemWeight.hasError('required') ? 'Enter a value' :
        this.itemWeight.hasError('pattern') ? 'Number greater or equal 0' :
            '';
  }

  getQuantityErrorMessage() {
    return this.itemQuantity.hasError('required') ? 'Enter a value' :
        this.itemQuantity.hasError('pattern') ? 'Number greater or equal 1' :
            '';
  }

  dataInvalid(): boolean{
    return (this.itemName.invalid
      || this.itemWeight.invalid
      || this.itemQuantity.invalid);
  }

  getItems() {
    this.itemService.getTripItems(this.trip.trip_id)
      .subscribe(response => {
        // console.log(response);
        this.tripItems = [];
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
      this.getItems();
    })
  }

  ngOnInit() {
    this.isPersonalInventory = false
    this.getItems();
    this.itemsDataSource.sort = this.sort;
  }

}
