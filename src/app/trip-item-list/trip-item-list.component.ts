import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort, MatDialog } from '@angular/material';
import { ItemService } from '../_services/item.service';
import { RoleService } from '../_services/role.service';
import { Item, Trip, Role, Group } from '../trip';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-trip-item-list',
  templateUrl: './trip-item-list.component.html',
  styleUrls: ['./trip-item-list.component.css'],
})
export class TripItemListComponent implements OnInit {
  name: string;
  edited_name: string;
  weight: number;
  edited_weight: number;
  quantity: number;
  edited_quantity: number;
  tag: number;
  edited_tag: number;

  itemName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  itemNameEdit = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  itemWeight = new FormControl('', [Validators.required, Validators.pattern("([0-9]*[.])?[0-9]+")]);
  itemWeightEdit = new FormControl('', [Validators.required, Validators.pattern("([0-9]*[.])?[0-9]+")]);
  itemQuantity = new FormControl('', [Validators.required, Validators.pattern("[1-9]|10+")]);
  itemQuantityEdit = new FormControl('', [Validators.required, Validators.pattern("[1-9]|10+")]);
  tagName = new FormControl('', Validators.required);

  @Input() trip: Trip;
  tripItems: Item[] = [];
  tripRoles: Role[] = [];
  userTripRoles: Role[] = [];
  itemData: Item;
  selectedItem: Item;
  itemsDataSource = new MatTableDataSource(this.tripItems);
  isPersonalInventory: Boolean = false;
  currentItem: number = null;

  displayedColumns: string[] = ['tag', 'name', 'weight', 'quantity', 'buttons'];
  groupByColumns: string[] = ['role_color'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private itemService: ItemService,
    private roleService: RoleService,
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  getTagErrorMessage() {
    return this.tagName.hasError('required') ? 'Choose a tag' : '';
  }

  getNameErrorMessage() {
    return this.itemName.hasError('required') ? 'Enter a value' :
        this.itemName.hasError('maxlength') ? 'Max length 20 characters' :
        this.itemName.hasError('minlength') ? 'Min length 3 characters' : '';
  }

  getNameEditErrorMessage() {
    return this.itemNameEdit.hasError('required') ? 'Enter a value' :
        this.itemNameEdit.hasError('maxlength') ? 'Max length 20 characters' :
        this.itemNameEdit.hasError('minlength') ? 'Min length 3 characters' : '';
  }

  getWeightErrorMessage() {
    return this.itemWeight.hasError('required') ? 'Enter a value' :
        this.itemWeight.hasError('pattern') ? 'Greater or equal 0' : '';
  }

  getWeightEditErrorMessage() {
    return this.itemWeightEdit.hasError('required') ? 'Enter a value' :
        this.itemWeightEdit.hasError('pattern') ? 'Greater or equal 0' : '';
  }

  getQuantityErrorMessage() {
    return this.itemQuantity.hasError('required') ? 'Enter a value' :
        this.itemQuantity.hasError('pattern') ? 'Greater or equal 1' : '';
  }

  getQuantityEditErrorMessage() {
    return this.itemQuantityEdit.hasError('required') ? 'Enter a value' :
        this.itemQuantityEdit.hasError('pattern') ? 'Greater or equal 1' : '';
  }

  inputDataInvalid(): boolean{
    if (this.isPersonalInventory) {
      return (this.itemName.invalid
        || this.itemWeight.invalid
        || this.itemQuantity.invalid);
    } else {
        return (this.itemName.invalid
          || this.itemWeight.invalid
          || this.itemQuantity.invalid
          || this.tagName.invalid);
    }
  }

  editDataInvalid(): boolean{
    return (this.itemNameEdit.invalid
      || this.itemWeightEdit.invalid
      || this.itemQuantityEdit.invalid);
  }

  setColorToItems() {
    this.tripItems.map(item => {
      let role = this.tripRoles.find(role => role.id === item.role_id)
      if (role == undefined) {
        item.role_color = 'white'
      } else {
        item.role_color = role.color
      }
    })
  }

  getItems() {
    this.itemService.getTripItems(this.trip.trip_id)
    .subscribe(response => {
      this.tripItems = [];
      console.log(response);
      if (response.data.equipment) {
        let itemUsers = [];
        response.data.equipment.forEach(element =>{
          this.tripItems.push(element as Item)
          itemUsers.push({
            item_id: element.equipment_id,
            users: element.users
          });
        });
        this.itemService.addUserItems(itemUsers);
      } else {
        response.data.personal_stuff.forEach(element => this.tripItems.push(element as Item));
      }
      this.getTripRoles();
    });
  }

  addItem(): void {
    if (this.isPersonalInventory) {
      this.itemData = {
        "name": this.name,
        "weight": this.weight,
        "quantity": this.quantity,
        "trip_id": this.trip.trip_id,
        "owner_id": this.userService.getUserId()
      };
    } else {
        this.itemData = {
          "name": this.name,
          "weight": this.weight,
          "quantity": this.quantity,
          "trip_id": this.trip.trip_id,
          "role_id": this.tag
        };
    }


    this.name = "";
    this.weight = 0;
    this.quantity = 1;

    this.itemService.addTripItem(this.itemData)
    .subscribe(data => {
      this.getItems();
    })
  }

  deleteItemFromList(equipment_id: number) {
    this.itemService.deleteTripItem(equipment_id)
    .subscribe(response => {
      alert(response.data);
      this.getItems();
    });
  }

  openDeleteDialog(item: Item): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      height: '150px',
      data: `Do you really want to remove ${item.name}?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteItemFromList(item.equipment_id);
      }
    });
  }

  isUserWithTag(role_id: number) {
    if (this.userTripRoles.some(role => role.id === role_id)) {
      return true;
    } else {
      return false;
    }
  }

  isNotInEditMode(id: number) {
    if (this.currentItem === null) {
      return true;
    }
    if (this.currentItem === id) {
      return false;
    }
    return true;
  }

  startEditMode(item: Item) {
    this.currentItem = item.equipment_id;
    this.edited_name = item.name;
    this.edited_weight = item.weight;
    this.edited_quantity = item.quantity;
    this.edited_tag = item.role_id;
  }

  endEditMode() {
    this.currentItem = null;
  }

  submitChanges() {
    this.itemData = {
      "name": this.edited_name,
      "weight": this.edited_weight,
      "quantity": this.edited_quantity,
      "trip_id": this.trip.trip_id,
      "role_id": this.edited_tag
    };

    this.itemService.changeTripItem(this.currentItem, this.itemData)
    .subscribe(response => {
      this.getItems();
    });

    this.currentItem = null;
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

  getUserTripRoles() {
    if (this.trip['admin_id'] == this.userService.getUserId()) {
      this.userTripRoles = this.tripRoles;
      return;
    }
    this.roleService.getUserRoles(this.trip.trip_id)
    .subscribe(roles => {
      this.userTripRoles = [];
      roles.data.roles.forEach(role =>
        this.userTripRoles.push(role as Role));
    });
  }

  // BEGIN block of code for grouping tags
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
    });
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
  // END block of code for grouping tags

  ngOnInit() {
    this.itemsDataSource.sort = this.sort;
    this.itemService.isPersonalInventoryStatus
      .subscribe(status => {
        this.isPersonalInventory = status;
        this.getItems()
    });
    this.roleService.newRole.subscribe(role => {
      if (role === null) {
        return;
      }
      this.tripRoles.push(role as Role);
    });
  }
  selectItem(item: Item) {
    if (this.userTripRoles.map(role => role.id).includes(item['role_id'])) {
      this.selectedItem = item;
      this.itemService.selectNewItem(item);
    } else {
      console.log('User has no access to this item');
    }
  }
  isItemSelected(id: number) {
    if (this.selectedItem == null) {
      return false;
    }
    return this.selectedItem['equipment_id'] == id;
  }
  isAnySelected(): boolean {
    return this.selectedItem == null;
  }
  commitChanges(item) {
    this.itemService.selectNewItem(item);
    this.selectedItem = null;
  }
  cancelChanges() {
    this.selectedItem = null;
    this.itemService.selectNewItem(null);
  }
}
