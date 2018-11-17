import { Component, OnInit } from '@angular/core';
import { AppstateService } from '../../services/appstate.service';
import { BkkService } from '../../services/bkk.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  geolocationPosition;
  availableStops;

  constructor(protected  appState: AppstateService, private bkkService: BkkService) { }

  setAvailableStops(stopsForLocation) {
    this.availableStops = [];
    for (const stop of stopsForLocation.data.list) {
      this.availableStops.push(stop);
    }

  }

  loadStops() {
    const data = this.bkkService.getStopsForLocation(
      this.geolocationPosition.coords.latitude,
      this.geolocationPosition.coords.longitude)
      .subscribe( (stopsForLocation) => {
        this.setAvailableStops(stopsForLocation);
    });
  }

  selectStop(stop: Object) {
    console.log('select stop clicked');
    this.appState.selectedStop = stop;
    this.appState.activeComponent = this.appState.appComponents.TIMETABLE;
  }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        position => {
          this.geolocationPosition = position;
          this.loadStops();
          console.log(position);
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
    }
  }

}
