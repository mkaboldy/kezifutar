import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Station} from '../../interfaces/station';
import { BkkService } from '../../services/bkk.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  availableStations: Array<Station> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bkkService: BkkService,
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
          'BKK_043343', 'BKK_F02417', 'BKK_05566'
        ]
      },
    ];
  }

  ngOnInit(): void {
    const latlon = this.route.snapshot.paramMap.get('latlon').split(',');
    const lat = parseFloat(latlon[0]);
    const lon = parseFloat(latlon[1]);
    const data = this.bkkService.getStationsForLocation(lat, lon).subscribe(
      (stationsForLocation) => {
        this.availableStations = stationsForLocation.stations;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
