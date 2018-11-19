import { Component, OnInit} from '@angular/core';
import { AppstateService } from 'src/app/services/appstate.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(public appState: AppstateService, public router: RouterModule) { }

  // TODO refactor this
  collapseNav() {
    document.getElementById('navbarToggler').click();
  }

  ngOnInit() { }
}
