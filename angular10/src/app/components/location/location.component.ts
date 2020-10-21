import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Station, Stop} from '../../interfaces/station';
import { BkkService } from '../../services/bkk.service';

interface LatLon {
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  availableStations: Array<Station> = [];

  constructor(
    private bkkService: BkkService,
    private route: ActivatedRoute,
  ) {
    this.availableStations = [
      {
        ID: 'F1202',
        name: 'Széll Kálmán Tér',
        vehicleTypes: {
          bus: false,
          tram: false,
          trolleybus: false,
          rail: false,
          subway: false,
        },
        stops: [
          {id: 'BKK_043343'}, {id: 'BKK_F02417'}, {id: 'BKK_05566'}
        ],
        stopCodeList: 'BKK_043343,BKK_F02417,BKK_05566',
      },
    ];
  }

  private loadBoards(latlon: LatLon): void{
    const data = this.bkkService.getStationsForLocation(latlon.lat, latlon.lon).subscribe(
      (stationsForLocation) => {
        this.availableStations = stationsForLocation.stations;
        this.availableStations.forEach(station => {
          const stopCodes = [];
          station.stops.forEach((stop: Stop) => stopCodes.push(stop.id));
          station.stopCodeList = stopCodes.join(',');
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {

    const paramLatLon = this.route.snapshot.paramMap.get('latlon');

    if (paramLatLon) {
      const latlons = paramLatLon.split(',');
      const lat = parseFloat(latlons[0]);
      const lon = parseFloat(latlons[1]);
      this.loadBoards({lat, lon});
    } else {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            this.loadBoards({lat: position.coords.latitude, lon: position.coords.longitude})
          },
          (error) => console.error(error)
        );
      } else {
        console.error({code: -1, message: 'Unsupported Browser'});
      }
    }
  }
}
