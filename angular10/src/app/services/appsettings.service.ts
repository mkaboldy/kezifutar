import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AppSettings } from './../classes/app-settings';

@Injectable({
  providedIn: 'root'
})

export class AppsettingsService {

  settings: AppSettings;
  private SETTINGS_KEY = 'appsettings';

  constructor() {
    this.settings = this.retrieveSettings();
  }

  getSettings(): Observable<AppSettings> {
    return of<AppSettings>(this.settings);
  }

  saveSettings(settings: AppSettings): void {
    this.settings = settings;
    this.storeSettings(settings);
  }

  storeSettings(settings: AppSettings): void {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }

  retrieveSettings(): AppSettings {
    const settings = localStorage.getItem(this.SETTINGS_KEY);
    if (settings) {
      return JSON.parse(settings);
    } else {
      return new AppSettings();
    }
  }
}
