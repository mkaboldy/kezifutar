import { Component, OnInit } from '@angular/core';
import { BkkService } from '../../services/bkk.service';
import { Station} from '../../interfaces/station';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.scss']
})
export class DeparturesComponent implements OnInit {

  departureBoard: {
    station: Station,
    departures: Array<any>,
  };

  constructor(
    private bkkService: BkkService,
  ) {
    this.departureBoard = {
      station: {
        ID: 'XXX',
        name: 'Blaha Lujza tér'
      },
      departures: [
        {
          line: '6',
          destination: 'Széll Kálmán tér',
          departure: '',
          departing: true
        },
        {
          line: '4',
          destination: 'Újbuda-központ M',
          departure: '',
          departing: true
        },
        {
          line: '4',
          destination: 'Széll Kálmán tér',
          departure: 5,
          departing: false
        },
        {
          line: '6',
          destination: 'Móricz Zsigmond körtér M',
          departure: 9,
          departing: false
        }
      ]
    };
  }

  ngOnInit(): void {
  }

}
