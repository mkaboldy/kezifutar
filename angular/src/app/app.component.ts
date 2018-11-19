import { Component } from '@angular/core';
import { AppstateService } from 'src/app/services/appstate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public appState: AppstateService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() { }
}
