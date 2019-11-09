import { Component, OnInit } from '@angular/core';
import {TripService} from "../_services/trip.service";
import { ActivatedRoute } from '@angular/router';
import {Trip} from "../trip";

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
  selector: 'app-trip-detail-page-map',
  templateUrl: './trip-detail-page-map.component.html',
  styleUrls: ['./trip-detail-page-map.component.css']
})
export class TripDetailPageMapComponent implements OnInit {
  public trip: Trip = {name:'', start_date:''};
  trip_id;
  public location: Location = {
    lat: 50.431273,
    lng: 30.550139,
    markers: [ ],
    zoom: 5
  };

  getTrip(): void {
    this.trip_id = +this.route.snapshot.paramMap.get('trip_id');
    this.trip = this.tripService.getTrip(this.trip_id);
    console.log(this.trip);
    for(var counter:number = 0; counter<this.trip.points.length; counter++){
      let marker = this.trip.points[counter];
      const newMarker: Marker = {
        order: counter +1,
        lat: marker.latitude,
        lng:  marker.longitude,
        selected: false,};
      this.tripService.addCheckpointToList(newMarker.lat,newMarker.lng, newMarker.order );
      this.location.markers.push(newMarker);
    }
  }

  constructor(private tripService : TripService,
  private route: ActivatedRoute) { }
  ngOnInit() {
    this.getTrip();
  }

}
