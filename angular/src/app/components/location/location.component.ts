import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppstateService } from '../../services/appstate.service';
import { BkkService } from '../../services/bkk.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  availableStops;
  positionAcquired: boolean;
  positionError: PositionError;
  loadError;

  constructor(
    protected  appState: AppstateService,
    private bkkService: BkkService,
    private geolocationServcice: GeolocationService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  setAvailableStops(stopsForLocation) {
    this.availableStops = [];
    for (const stop of stopsForLocation.data.list) {
      if (stop['routeIds'].length) {
        this.availableStops.push(stop);
      }
    }
  }

  loadStops(lat: number, lon: number) {
    const data = this.bkkService.getStopsForLocation(lat, lon).subscribe(
      (stopsForLocation) => {
        this.setAvailableStops(stopsForLocation);
        data.unsubscribe();
      },
      (error) => {
        console.log(error);
        this.loadError = error;
      }
    );
  }

  selectStop(stop: Object) {
    this.router.navigate(['/timetable/' + stop['id']]);
    return false;
  }

  // TODO refactor this
  collapseNav() {
    if (document.getElementById('navbarCollapse').getAttribute('class').split(' ').findIndex(a => a === 'show') !== -1) {
      document.getElementById('navbarToggler').click();
    }
  }

  ngOnInit() {
    const paramLat = parseFloat(this.route.snapshot.paramMap.get('lat'));
    const paramLon = parseFloat(this.route.snapshot.paramMap.get('lon'));

    if (paramLat && paramLon) {
      this.positionAcquired = true;
      this.loadStops(paramLat, paramLon);
    } else {
      const locationSubscription = this.geolocationServcice.getLocation().subscribe(
        (position: Position) => {
          this.positionAcquired = true;
          this.loadStops(position.coords.latitude, position.coords.longitude);
        },
        (error: PositionError) => {
          this.positionError = error;
          console.error(error);
        },
        () => {
          locationSubscription.unsubscribe();
        }

      );
    }
  }
}
