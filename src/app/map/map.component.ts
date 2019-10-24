import { Component, OnInit } from '@angular/core';
import {TripService} from "../trip.service";

interface Marker {
  order: number;
  lat: number;
  lng: number;
  label?: string;
  selected: boolean;
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
    markers: [ ],
    zoom: 5
  };
  placeMarker($event) {
    const newMarker: Marker = {
      order: (this.location.markers.length +1),
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      selected: false,};
    this.tripService.addCheckpointToList(newMarker.lat,newMarker.lng, newMarker.order );
    this.location.markers.push(newMarker);
  }
  markerClick(marker, infoWindow) {
    if(this.infowindow){
      this.infowindow.close()
    }
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
      this.location.markers[_i].order--;
    }
    this.tripService.deleteCheckpointFromList(deleteMarkerIndex);
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

  constructor(private tripService : TripService) { }
  ngOnInit() {
  }

}
