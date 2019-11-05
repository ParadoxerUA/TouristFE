import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Items } from '../trip';

const ITEMS: Items[] = [];

@Component({
  selector: 'app-trip-item-list',
  templateUrl: './trip-item-list.component.html',
  styleUrls: ['./trip-item-list.component.css'],
})
export class TripItemListComponent implements OnInit {
  name: string;
  weight: number;
  amount: number;

  displayedColumns: string[] = ['name', 'weight', 'amount'];
  dataSource = new MatTableDataSource(ITEMS);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  addItem() {
    ITEMS.push({name: this.name,
                weight: this.weight,
                amount: this.amount});
    this.name = '';
    this.weight = 0;
    this.amount = 0;

    this.dataSource = new MatTableDataSource(ITEMS);
  }

  constructor() {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
