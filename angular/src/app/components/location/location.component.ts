import { Component, OnInit } from '@angular/core';
import { AppstateService } from '../../services/appstate.service';
import { BkkService } from '../../services/bkk.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  private _locationSubscription;
  availableStops;
  currentLocation: Position;

  constructor(
    protected  appState: AppstateService,
    private bkkService: BkkService,
    private geolocationServcice: GeolocationService,
    ) { }

  setAvailableStops(stopsForLocation) {
    this.availableStops = [];
    for (const stop of stopsForLocation.data.list) {
      this.availableStops.push(stop);
    }

  }

  loadStops(lat: number, lon: number) {
    const data = this.bkkService.getStopsForLocation(lat, lon)
      .subscribe( (stopsForLocation) => {
        this.setAvailableStops(stopsForLocation);
        data.unsubscribe();
    });
  }

  selectStop(stop: Object) {
    console.log('select stop clicked');
    this.appState.selectedStop = stop;
  }

  ngOnInit() {
    this._locationSubscription = this.geolocationServcice.getLocation().subscribe(
      (position: Position) => {
        if (this.currentLocation !== position) {
          this.currentLocation = position;
          this.loadStops(position.coords.latitude, position.coords.longitude);
        }
      },
      (error: PositionError) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this._locationSubscription.unsubscribe();
  }
}
