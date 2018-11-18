import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BkkService  } from '../../services/bkk.service';
import { AppstateService  } from '../../services/appstate.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
})

export class TimetableComponent implements OnInit {

  private _refreshSubscription: Subscription = new Subscription();
  public timeTable;

  constructor(
    private bkkService: BkkService,
    private router: Router,
    private route: ActivatedRoute,
    public appState: AppstateService) {
  }

  renderTimeTable(stop) {
    this._refreshSubscription.unsubscribe();
    this.loadTimetable(stop['id']);
    const refreshTimer = interval(15000);
    const blinkTimer = interval(500);
    let blink = false;
    const blinkSubscription = blinkTimer.subscribe(n => {
      blink = !blink;
      Array.from(document.querySelectorAll('.blink')).forEach( element => {
        element.setAttribute('style', 'opacity: ' + (blink ? '1' : '0'));
      });
    });

    this._refreshSubscription = refreshTimer.subscribe(
      (n) => {
        if (n < 5 ) {
          this.loadTimetable(stop['id']);
        } else {
          this._refreshSubscription.unsubscribe();
          Array.from(document.querySelectorAll('.blink')).forEach( element => {
            element.removeAttribute('style');
          });
          blinkSubscription.unsubscribe();
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        this._refreshSubscription.unsubscribe();
      }

    );
  }

  loadTimetable(stopId?: string) {
    if (stopId) {
      const subscription = this.bkkService.getArrivalsAndDeparturesForStop(stopId).subscribe( (arrivalsAndDeparturesForStop) => {
          this.setTimeTable(arrivalsAndDeparturesForStop);
        },
        (error) => {
          console.log(error);
        },
        () => {
          subscription.unsubscribe();
        }
      );
    }
  }

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

  private getDepartureMinutes(departureTime: Date, now?: Date): Number {
    const diff = departureTime.getTime() - now.getTime();
    return Math.ceil(diff / (60 * 1000));
  }

  private setTimeTable(arrivalsAndDeparturesForStop) {
    const timeTable = new Array();
    for (const stopTime of arrivalsAndDeparturesForStop.data.entry.stopTimes) {
      const oneLine = new Object();
      const routeId = arrivalsAndDeparturesForStop.data.references.trips[stopTime.tripId].routeId;
      oneLine['service'] = arrivalsAndDeparturesForStop.data.references.routes[routeId].shortName;
      oneLine['destination'] = stopTime.stopHeadsign;
      const departureTime = this.getDepartureTime(stopTime);
      const departureMinutes = this.getDepartureMinutes(departureTime, new Date());
      oneLine['departure'] =  departureMinutes ? departureMinutes + '\'' : '';
      oneLine['rowclass'] = (departureMinutes < 1 ? 'blink' : '');
      timeTable.push(oneLine);
    }
    this.timeTable = timeTable;
    this.appState.selectedStop = arrivalsAndDeparturesForStop.data.references.stops[this.appState.selectedStop['id']];
  }

  ngOnInit() {
    const paramStopId = this.route.snapshot.paramMap.get('stopId');
    if (paramStopId) {
      this.appState.selectedStop = { id : paramStopId };
      this.renderTimeTable( this.appState.selectedStop );
    } else {
      this.renderTimeTable(this.appState.selectedStop);
    }
  }

  ngOnDestroy() {
    this._refreshSubscription.unsubscribe();
  }
}
