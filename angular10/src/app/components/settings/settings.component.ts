import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../classes/app-settings';
import { AppsettingsService } from '../../services/appsettings.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  appSettings: AppSettings;

  constructor(
    private appSettingsService: AppsettingsService
  ) { }

  ngOnInit(): void {
    this.appSettingsService.getSettings().subscribe(
      settings => this.appSettings = settings,
      () => null,
      () => { }
    );
  }

  toggleShowMetros(event: MatSlideToggleChange): void {
    this.appSettings.showMetros = event.checked;
    this.appSettingsService.saveSettings(this.appSettings);
  }

  updateMaxLines(event: Event): void {
    this.appSettings.maxLines = parseInt((event.target as HTMLInputElement).value, 10);
    this.appSettingsService.saveSettings(this.appSettings);
  }
}
