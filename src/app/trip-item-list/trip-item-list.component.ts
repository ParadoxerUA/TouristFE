import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { ItemService } from '../_services/item.service';
import { RoleService } from '../_services/role.service';
import { Item, Trip, Role, Group } from '../trip';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-trip-item-list',
  templateUrl: './trip-item-list.component.html',
  styleUrls: ['./trip-item-list.component.css'],
})
export class TripItemListComponent implements OnInit {
  name: string;
  weight: number;
  quantity: number;
  tag: number;

  itemName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  itemWeight = new FormControl('', [Validators.required, Validators.pattern("([0-9]*[.])?[0-9]+")]);
  itemQuantity = new FormControl('', [Validators.required, Validators.pattern("[1-9]|10+")]);
  tagName = new FormControl('', Validators.required);

  @Input() trip: Trip;
  tripItems: Item[] = [];
  tripRoles: Role[] = [];
  userTripRoles: Role[] = [];
  itemData: Item;
  itemsDataSource = new MatTableDataSource(this.tripItems);
  isPersonalInventory: Boolean = false

  displayedColumns: string[] = ['tag', 'name', 'weight', 'quantity'];
  groupByColumns: string[] = ['role_color'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private itemService: ItemService,
    private roleService: RoleService,
    private userService: UserService,
  ) { }

  getTagErrorMessage() {
    return this.tagName.hasError('required') ? 'Choose a tag' :
            '';
  }

  getNameErrorMessage() {
    return this.itemName.hasError('required') ? 'Enter a value' :
        this.itemName.hasError('maxlength') ? 'Max length 20 characters' :
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
      || this.itemQuantity.invalid
      || this.tagName.invalid);
  }

  setColorToItems() {
    this.tripItems.map(item => item.role_color =
      this.tripRoles.find(role => role.id === item.role_id).color);
  }

  getItems() {
    this.itemService.getTripItems(this.trip.trip_id)
    .subscribe(response => {
      this.tripItems = [];
      response.data.equipment.forEach(element =>
        this.tripItems.push(element as Item));

      this.getTripRoles();
    });
  }

  addItem(): void {
    this.itemData = {
      "name": this.name,
      "weight": this.weight,
      "quantity": this.quantity,
      "trip_id": this.trip.trip_id,
      "role_id": this.tag
    };

    this.name = "";
    this.weight = 0;
    this.quantity = 1;

    this.itemService.addTripItem(this.itemData)
    .subscribe(data => {
      this.getItems();
    })
  }

  getTripRoles() {
    this.roleService.getTripRoles(this.trip.trip_id)
    .subscribe(response => {
      this.tripRoles = [];
      response.data.roles.forEach(role =>
        this.tripRoles.push(role as Role));
      this.getUserTripRoles();
      this.setColorToItems();
      this.itemsDataSource.data = this.addGroups(this.tripItems, this.groupByColumns);
    });
  }

  setRolesToUser(response) {
    this.userTripRoles = response.data.filter(user_role =>
      user_role.trip_id === this.trip.trip_id)
  }

  getUserTripRoles() {
    if (this.trip['admin_id'] == this.userService.getUserId()) {
      this.userTripRoles = this.tripRoles;
      return;
    }
    this.roleService.getUserRoles()
    .subscribe(response => {
      this.userTripRoles = [];
      this.setRolesToUser(response);
    });
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    var rootGroup = new Group();
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    // Recursive function, stop when there are no more levels.q
    if (level >= groupByColumns.length)
      return data;

    var groups = this.uniqueBy(
      data.map(
        row => {
          var result = new Group();
          result.level = level + 1;
          result.parent = parent;
          for (var i = 0; i <= level; i++)
            result[groupByColumns[i]] = row[groupByColumns[i]];
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];

    var subGroups = [];
    groups.forEach(group => {
      let rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn])
      let subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    })
    return subGroups;
  }

  uniqueBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
  }

  isGroup(index, item): boolean {
    return item.level;
  }

  ngOnInit() {
    this.getItems();
    this.isPersonalInventory = false;
    this.itemsDataSource.sort = this.sort;
    this.itemService.isPersonalInventoryStatus
      .subscribe(status => {
        this.isPersonalInventory = status
    });
    this.roleService.newRole.subscribe(role => {
      if (role === null) {
        return;
      }
      this.tripRoles.push(role as Role);
    });
  }

}
