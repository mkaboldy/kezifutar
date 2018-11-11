import { Component, OnInit } from '@angular/core';
import { BkkService  } from '../../services/bkk.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent implements OnInit {

  timeTable;
  stops;
  selectedStop = 'BKK_F02398';

  constructor(private bkkService: BkkService) { }

  getSelectedStop() {
    const key = Object.keys(this.timeTable.data.references.stops)[0];
    return this.timeTable.data.references.stops[key].name;
  }

  getEntries() {
    console.log(this.timeTable);
    return this.timeTable.data.entry.stopTimes;
  }

  getDepartureTime(stopTime) {
    const now = new Date();
    let departureTime = '?';

    if (stopTime.predictedDepartureTime) {
      const predicted = new Date(stopTime.predictedDepartureTime * 1000);
      const diff = (predicted.getTime() - now.getTime();
      departureTime = Math.ceil(diff / (60 * 1000)) + '\'';
    } else {
      if (stopTime.departureTime) {
        const departure = new Date(stopTime.departureTime * 1000);
        departureTime = departure.getHours() + ':' + departure.getMinutes();
      }
    }
    return departureTime;
  }

  loadTimetable(stopId?: string) {
    const data = this.bkkService.getArrivalsAndDeparturesForStop(stopId).subscribe( (data) => {
      console.log(data);
      this.timeTable = data;
    });
  }

  loadStops() {
    this.stops = this.bkkService.getStopsForLocation();
  }

  ngOnInit() {
    this.loadTimetable(this.selectedStop);
  }
}
