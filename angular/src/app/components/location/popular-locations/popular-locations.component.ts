import { Component, OnInit, Input } from '@angular/core';
import { LocationComponent } from '../location.component';

@Component({
  selector: 'app-popular-locations',
  templateUrl: './popular-locations.component.html',
  styleUrls: ['./popular-locations.component.css']
})

export class PopularLocationsComponent implements OnInit {

  @Input() parent: LocationComponent;

  popularCoords: Array<PopularCoord> = [
    { coord: {lat: 47.5655984, lon: 19.0446418}, name: 'Aquincum' },
    { coord: {lat: 47.5106624, lon: 19.0550335}, name: 'Westend' },
    { coord: {lat: 47.4943933, lon: 19.0593575}, name: 'Astoria' },
    { coord: {lat: 47.4740142, lon: 19.0480375}, name: 'Allee' },
    { coord: {lat: 47.49037, lon: 19.02356}, name: 'MOM Park' },
  ];

  popularStops: Array<PopularStop> = [
    { id: 'BKK_F02439', type: 'BUS', name: 'Thomán István utca'},
    { id: 'BKK_F02454', type: 'BUS', name: 'Csillebérc'},
    { id: 'BKK_F04816', type: 'BUS', name: 'Diósd, Kölcsey F. u.'},
    { id: 'BKK_F02101', type: 'TRAM', name: 'Farkasréti temető'},
    { id: 'BKK_F01596', type: 'TRAM', name: 'Új Köztemető'},
  ];

  constructor() { }

  ngOnInit() {
  }
}

class PopularCoord {
  coord: {lat: Number, lon: Number};
  name: String;
}

class PopularStop {
  id: String;
  type: String;
  name: String;
}

