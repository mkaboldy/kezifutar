import { Component } from '@angular/core';
import { AppstateService } from 'src/app/services/appstate.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    public appState: AppstateService,
    public translate: TranslateService
    ) {
      translate.addLangs(['en', 'hu']);
      translate.setDefaultLang('en');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|hu/) ? browserLang : 'en');
    }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() { }
}
