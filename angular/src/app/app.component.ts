import { Component, OnInit } from '@angular/core';
import { AppstateService } from 'src/app/services/appstate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  activeComponent;

  constructor(public appState: AppstateService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.appState.activeComponentObservable.subscribe( (value) => {
      this.activeComponent = value;
    });
    // init appstate
    this.appState.activeComponent = this.appState.appComponents.TIMETABLE;
  }
}
