import { Component, OnInit} from '@angular/core';
import { BkkService  } from '../../services/bkk.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
})

export class TimetableComponent implements OnInit {

  timeTable: Array<Object>;
  selectedStopId = 'BKK_F01017';
  selectedStopName = 'Lógolyó utca';
  selectedStopDirection = 'Buda felé';
  blink;

  constructor(private bkkService: BkkService) {
    this.timeTable = new Array();
    this.blink = false;

    const blinkCounter = interval(500);
    const blinkSubscription = blinkCounter.subscribe(n => {
      this.blink = !this.blink;
      Array.from(document.querySelectorAll('.blink')).forEach( element => {
        element.setAttribute('style', 'opacity: ' + (this.blink ? '1' : '0'));
      });
    });

    const refreshTimer = interval(15000);
    const refreshSubscription = refreshTimer.subscribe( n => {
      if (n < 4) {
        this.loadTimetable(this.selectedStopId);
      } else {
        refreshSubscription.unsubscribe();
        Array.from(document.querySelectorAll('.blink')).forEach( element => {
          element.removeAttribute('style');
        });
        blinkSubscription.unsubscribe();
      }
    });

  }

  loadTimetable(stopId?: string) {
    const data = this.bkkService.getArrivalsAndDeparturesForStop(stopId).subscribe( (arrivalsAndDeparturesForStop) => {
      this.setTimeTable(arrivalsAndDeparturesForStop);
      this.setSelectedStop(arrivalsAndDeparturesForStop);
    });
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
    this.timeTable = new Array();
    for (const stopTime of arrivalsAndDeparturesForStop.data.entry.stopTimes) {
      const oneLine = new Object();
      const routeId = arrivalsAndDeparturesForStop.data.references.trips[stopTime.tripId].routeId;
      oneLine['service'] = arrivalsAndDeparturesForStop.data.references.routes[routeId].shortName;
      oneLine['destination'] = stopTime.stopHeadsign;
      const departureTime = this.getDepartureTime(stopTime);
      const departureMinutes = this.getDepartureMinutes(departureTime, new Date());
      oneLine['departure'] =  departureMinutes ? departureMinutes + '\'' : '';
      oneLine['rowclass'] = (departureMinutes < 1 ? 'blink' : '');
      this.timeTable.push(oneLine);
    }
  }

  private setSelectedStop(arrivalsAndDeparturesForStop) {
    const key = Object.keys(arrivalsAndDeparturesForStop.data.references.stops)[0];
    this.selectedStopId = key;
    this.selectedStopName = arrivalsAndDeparturesForStop.data.references.stops[key].name;
  }

  ngOnInit() {
    this.loadTimetable(this.selectedStopId);
  }
}
