import { Component, OnInit } from '@angular/core';
import { AppstateService } from 'src/app/services/appstate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  activeComponent;

  constructor(public appState: AppstateService) { }

  ngOnInit() {
    this.appState.activeComponentObservable.subscribe( (value) => {
      this.activeComponent = value;
    });
  }
}
