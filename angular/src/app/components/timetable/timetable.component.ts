import { Component, OnInit} from '@angular/core';
import { BkkService  } from '../../services/bkk.service';
import { AppstateService  } from '../../services/appstate.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
})

export class TimetableComponent implements OnInit {

  constructor(private bkkService: BkkService, protected  appState: AppstateService) {
    this.appState.selectedStop$.subscribe((stop) => {
      console.log('notification received');
      console.log(stop);
      this.renderTimeTable(stop);
    });
  }

  renderTimeTable(stop) {
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

    const refreshSubscription = refreshTimer.subscribe( n => {
      if (n < 5 ) {
        this.loadTimetable(stop['id']);
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
    if (stopId) {
      this.bkkService.getArrivalsAndDeparturesForStop(stopId).subscribe( (arrivalsAndDeparturesForStop) => {
        console.log('returned arrivalsAndDeparturesForStop:');
        console.log(arrivalsAndDeparturesForStop);
        this.setTimeTable(arrivalsAndDeparturesForStop);
      });
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
    console.log('processing arrivalsAndDeparturesForStop:');
    console.log(arrivalsAndDeparturesForStop);
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
    this.appState.activeTimeTable = timeTable;
  }

  ngOnInit() { }
}
