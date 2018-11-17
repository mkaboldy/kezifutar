import { Component, OnInit } from '@angular/core';
import { AppstateService } from 'src/app/services/appstate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  activeComponent;

  constructor(protected appState: AppstateService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // init appstate
    this.appState.activeComponent = this.appState.activeTimeTable
    ? this.appState.appComponents.TIMETABLE : this.appState.appComponents.LOCATION;
  }
}
