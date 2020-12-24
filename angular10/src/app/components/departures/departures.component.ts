import { Component, OnInit } from '@angular/core';
import { AppsettingsService } from '../../services/appsettings.service';
import { BkkService } from '../../services/bkk.service';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Idle } from 'idlejs/dist';
import { Station} from '../../interfaces/station';
import { AppSettings } from 'src/app/classes/app-settings';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.scss']
})

export class DeparturesComponent implements OnInit {

  public isLoading = true;
  public loadingFailed = false;
  private refreshSubscription: Subscription;
  private refreshFrequencySecs = 15;
  private settings: AppSettings;
  private idle = new Idle();
  public userIsIdle = false;
  public userTimeoutMins = 2;

  departureBoards: {
    stations: any
  };

  constructor(
    private bkkService: BkkService,
    private router: Router,
    private route: ActivatedRoute,
    private appSettingsService: AppsettingsService
  ) {
    this.departureBoards = { stations: {}};
/*
    this.departureBoards = {
      stations: {
        BKK_CSF00065: {
          ID: 'BKK_CSF00065',
          name: 'Batthyány tér M+H',
          departures: [
            {
              line: '41',
              lineDescription: 'Kamaraerdei Ifj. Park | Bécsi út / Vörösvári út',
              vehicleType: 'TRAM',
              destination: 'Kamaraerdei Ifjúsági Park',
              departureMins: 0,
            },
            {
              line: 'H5',
              lineDescription: 'Szentendre | Batthyány tér',
              vehicleType: 'RAIL',
              destination: 'Szentendre',
              departureMins: 3
            },
            {
              line: '990',
              lineDescription: 'Rákoskeresztúr, városkp. | Normafa',
              vehicleType: 'BUS',
              destination: 'Rákoskert',
              departureMins: 3
            },
            {
              line: '11',
              lineDescription: 'Nagybányai út | Batthyány tér M H',
              vehicleType: 'BUS',
              destination: 'Nagybányai út',
              departureMins: 3
            },
            {
              line: '109',
              lineDescription: 'Batthyány tér M H | Óbuda, Bogdáni út',
              vehicleType: 'BUS',
              destination: 'Óbuda, Bogdáni út',
              departureMins: 4
            },
            {
              line: '19',
              lineDescription: 'Kelenföld vasútállomás M | Bécsi út / Vörösvári út',
              vehicleType: 'TRAM',
              destination: 'Bécsi út / Vörösvári út',
              departureMins: 5
            },
            {
              line: '19',
              lineDescription: 'Kelenföld vasútállomás M | Bécsi út / Vörösvári út',
              vehicleType: 'TRAM',
              destination: 'Kelenföld vasútállomás M',
              departureMins: 10
            },
            {
              line: '41',
              lineDescription: 'Kamaraerdei Ifj. Park | Bécsi út / Vörösvári út',
              vehicleType: 'TRAM',
              destination: 'Bécsi út / Vörösvári út',
              departureMins: 14
            },
            {
              line: '41',
              lineDescription: 'Kamaraerdei Ifj. Park | Bécsi út / Vörösvári út',
              vehicleType: 'TRAM',
              destination: 'KOCSISZÍNBE  Budafok kocsiszín',
              departureMins: 22
            },
            {
              line: '990',
              lineDescription: 'Rákoskeresztúr, városkp. | Normafa',
              vehicleType: 'BUS',
              destination: 'Normafa',
              departureMins: 24
            },
            {
              line: '109',
              lineDescription: 'Batthyány tér M H | Óbuda, Bogdáni út',
              vehicleType: 'BUS',
              destination: 'Óbuda, Bogdáni út',
              departureMins: 26
            }
          ]
        },
        BKK_CSF00166: {
          ID: 'BKK_CSF00166',
          name: 'Budagyöngye',
          departures: [
            {
              line: '56A',
              lineDescription: 'Móricz Zs. körtér M | Hűvösvölgy',
              vehicleType: 'TRAM',
              destination: 'Hűvösvölgy',
              departureMins: 4
            },
            {
              line: '61',
              lineDescription: 'Móricz Zs. körtér M | Hűvösvölgy',
              vehicleType: 'TRAM',
              destination: 'Hűvösvölgy',
              departureMins: 13
            }
          ]
        }
      }
    };
*/
  }

  loadDepartureBoards(): void {
    const stops = this.route.snapshot.paramMap.get('stops').split(',');
    const data = this.bkkService.getDeparturesForStos(stops).subscribe(
      (departuresForStops) => {
        const stations = Object.keys(departuresForStops.stations);
        stations.forEach(station => {
          if (!this.settings.showMetros) {
            departuresForStops.stations[station].departures = departuresForStops.stations[station].departures.filter(departure =>
              !['SUBWAY', 'RAIL'].some(element => element === departure.vehicleType)
            );
          }
          if (this.settings.maxLines > 0) {
            departuresForStops.stations[station].departures =
            departuresForStops.stations[station].departures.length
              ? departuresForStops.stations[station].departures.slice(0, this.settings.maxLines)
              : [] ;
          }
        });
        this.isLoading = false;
        this.departureBoards = departuresForStops;
      },
      (error) => {
        this.isLoading = false;
        this.loadingFailed = true;
        console.log(error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  renderDepartureBoards(): void {
    // this.refreshSubscription.unsubscribe();
    this.loadDepartureBoards();
    const refreshTimer = interval(this.refreshFrequencySecs * 1000);

    this.refreshSubscription = refreshTimer.subscribe(
      (n) => {
        this.loadDepartureBoards();
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.refreshSubscription.unsubscribe();
      }
    );
  }

  resumeClick(): void {
    this.renderDepartureBoards();
    this.userIsIdle = false;
    this.idle.restart();
  }

  ngOnInit(): void {
    this.appSettingsService.getSettings().subscribe(
      settings => this.settings = settings,
      () => null,
      () => {}
    );

    this.renderDepartureBoards();

    this.idle.whenNotInteractive()
      .within(this.userTimeoutMins)
      .do(() => {
        this.userIsIdle = true;
        this.refreshSubscription.unsubscribe();
      })
      .start();
  }
}
