import { Component, OnInit } from '@angular/core';
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
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
  public location: Location = {
    lat: 50.431273,
    lng: 30.550139,
    markers: [ {
      lat: 50.431273,
      lng: 30.550139,
      draggable: true
    }],
    zoom: 5
  };

  placeMarker($event) {
    const newMarker: Marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
    };
    this.location.markers.push(newMarker);
    this.location.markers[1].draggable = false;
  }
  markerClick($event) {
    for ( const foo of  this.location.markers) {
      if ( foo.lat === $event.latitude &&  foo.lng === $event.longitude) {
        this.selectedMarker = foo;
      }
    }
    console.log(this.selectedMarker);
  }
  constructor() { }

  ngOnInit() {
  }

}
