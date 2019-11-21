import { Component, OnInit } from '@angular/core';
import {TripService} from "../_services/trip.service";
import {FormControl, Validators} from "@angular/forms";

interface Marker {
  order: number;
  lat: number;
  lng: number;
  name: string;
  selected: boolean;
  editable:boolean;
}

interface Location {
  lat: number;
  lng: number;
  zoom: number;
  markers?: Marker[];
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public selectedMarkerIndex = 0;
  public infowindow;
  public location: Location = {

    lat: 50.431273,
    lng: 30.550139,
    markers: [{
      order: 1,
      name: "Point 1",
      lat: 50.431273,
      lng: 30.550139,
      selected: false,
      editable: false,
    }],
    zoom: 5
  };
  placeMarker($event) {
    const newMarker: Marker = {
      order: (this.location.markers.length +1),
      name: "Point "+(this.location.markers.length +1),
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      selected: false,
      editable: false};
    this.location.markers.push(newMarker);
    if(this.infowindow){
      this.infowindow.close()
    }
    for (let _i = 0; _i < this.location.markers.length; _i++) {
      this.location.markers[_i].editable = false;
    }
    this.tripService.updateCheckpointList(this.location.markers);
  }
  markerClick(marker, infoWindow) {
    if(this.infowindow){
      this.infowindow.close()
    }
    for (let _i = 0; _i < this.location.markers.length; _i++) {
      this.location.markers[_i].selected = false;
      this.location.markers[_i].editable = false;
    }
    marker.selected = true;
    marker.editable = true;
    this.infowindow = infoWindow;
  }


  markerRightClick(infoWindow)
  {
    if(this.infowindow){
      this.infowindow.close()
    }
    infoWindow.open();
    this.infowindow = infoWindow;
  }
  onClickInfoView(marker)
  {
   this.deleteMarker(marker);
   this.infowindow = undefined;
  }
  deleteMarker(marker)
  {
    const deleteMarkerIndex = this.location.markers.indexOf(marker);
    this.location.markers.splice(deleteMarkerIndex, 1);
    for (let _i = deleteMarkerIndex; _i < this.location.markers.length; _i++) {
      let baseOrder = this.location.markers[_i].order.toString();
      let baseName = "Point " + baseOrder;
      if (this.location.markers[_i].name.search(baseName) != -1)
      {
        this.location.markers[_i].name = this.location.markers[_i].name.replace(baseOrder, (_i+1).toString());
      }
      this.location.markers[_i].order--;
    }
    this.tripService.updateCheckpointList(this.location.markers);
  }

  onMouseOver(marker){
    for (var _i = 0; _i < this.location.markers.length; _i++) {
      if (this.location.markers[_i] === marker) {
        marker.selected = true;
        this.selectedMarkerIndex = _i;
      }
    }
  }
  onMouseOut(marker) {
    marker.selected = false;
  }
  showText()
  {
    console.log('Text field', this.location.markers)
  }
  onNameChange(){
    this.tripService.updateCheckpointList(this.location.markers);
  }
  selectMarker(marker)
  {
        for (let _i = 0; _i < this.location.markers.length; _i++) {
      this.location.markers[_i].editable = false;
    }
    marker.editable = true;
  }
  constructor(private tripService : TripService) { }
  ngOnInit() {

  }

}
