import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BkkService  } from '../../services/bkk.service';
import { AppstateService  } from '../../services/appstate.service';
import { interval, Subscription } from 'rxjs';
import { Idle } from 'idlejs/dist';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
})

export class TimetableComponent implements OnInit {

  private _refreshSubscription: Subscription = new Subscription();
  private _idle = new Idle();
  private _refreshFrequencySecs = 15;
  public stopName;
  public stopColorTypes;
  public timeTable;
  public userIsIdle = false;
  public userTimeoutMins = 2;
  public loadError = false;

  constructor(
    private _bkkService: BkkService,
    private _route: ActivatedRoute,
    public appState: AppstateService) {
  }

  renderTimeTable(stop) {
    this._refreshSubscription.unsubscribe();
    this.loadTimetable(stop['id']);
    const refreshTimer = interval(this._refreshFrequencySecs * 1000);

    this._refreshSubscription = refreshTimer.subscribe(
      (n) => {
        this.loadTimetable(stop['id']);
      },
      (error) => {
        console.error(error);
      },
      () => {
        this._refreshSubscription.unsubscribe();
      }

    );
  }

  loadTimetable(stopId?: string) {
    if (stopId) {
      const subscription = this._bkkService.getArrivalsAndDeparturesForStop(stopId).subscribe( (arrivalsAndDeparturesForStop) => {
          this.loadError = false;
          this.setTimeTable(arrivalsAndDeparturesForStop);
        },
        (error) => {
          this.loadError = true;
          console.error(error);
        },
        () => {
          subscription.unsubscribe();
        }
      );
    }
  }

  /* TODO refactor this */
  private getDepartureTime(stopTime) {
    let departureTime = new Date();
    if (stopTime.predictedDepartureTime) {
      departureTime = new Date(stopTime.predictedDepartureTime * 1000);
    } else {
      if (stopTime.departureTime) {
        departureTime = new Date(stopTime.departureTime * 1000);
      }
    }
    return departureTime;
  }

  /* TODO refactor this */
  private getDepartureMinutes(departureTime: Date, now?: Date): Number {
    const diff = departureTime.getTime() - now.getTime();
    return Math.ceil(diff / (60 * 1000));
  }

  private setTimeTable(arrivalsAndDeparturesForStop) {
    // merge then sort timetables
    let stopTimes = [];
    let trips = new Object();
    let routes = new Object();
    let stops = new Object();
    arrivalsAndDeparturesForStop.forEach(element => {
      stopTimes = stopTimes.concat(element.data.entry.stopTimes);
      trips =  {...trips, ...element.data.references.trips};
      routes = {...routes, ...element.data.references.routes};
      stops = {...stops, ...element.data.references.stops};
    });
    stopTimes.sort( (a, b) => a.departureTime - b.departureTime);
    this.timeTable = [];
    for (const stopTime of stopTimes) {
      const oneLine = new Object();
      const routeId = trips[stopTime.tripId].routeId;
      oneLine['service'] = routes[routeId].shortName;
      oneLine['destination'] = stopTime.stopHeadsign;
      const departureTime = this.getDepartureTime(stopTime);
      const departureMinutes = this.getDepartureMinutes(departureTime, new Date());
      oneLine['departure'] =  departureMinutes ? departureMinutes + '\'' : '';
      this.timeTable.push(oneLine);
    }
    const classes = [];
    for (const stop in stops) {
      if (stops.hasOwnProperty(stop)) {
        this.stopName = stops[stop].name;
        classes.push(stops[stop].stopColorType);
      }
    }
    this.stopColorTypes = classes.join(' ');
  }

  resumeClick() {
    this.renderTimeTable( this.appState.selectedStop );
    this.userIsIdle = false;
    this._idle.restart();
  }

  ngOnInit() {
    const paramStopId = this._route.snapshot.paramMap.get('stopId');

    if (paramStopId) {
      this.appState.selectedStop = { id : paramStopId };
    }

    this.renderTimeTable(this.appState.selectedStop);

    this._idle.whenNotInteractive()
      .within(this.userTimeoutMins)
      .do(() => {
        this.userIsIdle = true;
        this._refreshSubscription.unsubscribe();
      })
      .start();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this._refreshSubscription.unsubscribe();
  }
}
