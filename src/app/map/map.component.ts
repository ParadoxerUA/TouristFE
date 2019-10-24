import { Component, OnInit } from '@angular/core';
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
  // viewport?: Object;
  zoom: number;
  markers?: Marker[];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public selectedMarker: Marker;
  public selectedMarkerIndex = 0;
  public infowindow;
  public location: Location = {

    lat: 50.431273,
    lng: 30.550139,
    markers: [ {
      order: 1,
      lat: 50.431273,
      lng: 30.550139,
      selected: false,
    }],
    zoom: 5
  };
  placeMarker($event) {
    const newMarker: Marker = {
      order: (this.location.markers.length +1),
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      selected: false,
    };
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
    var deleteMarkerIndex = this.location.markers.indexOf(marker);
    this.location.markers.splice(deleteMarkerIndex, 1);
    for (var _i = deleteMarkerIndex; _i < this.location.markers.length; _i++) {
      this.location.markers[_i].order--;
      }
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

  constructor() { }
  ngOnInit() {
  }

}
