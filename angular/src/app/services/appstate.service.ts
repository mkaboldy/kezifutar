import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppstateService {

  public activeComponentObservable = new Subject<any>();
  public appComponents = {
      TIMETABLE: 1,
      LOCATION: 2,
      SETTINGS: 3,
      ABOUT: 4
  };

  constructor() {}

  emitActiveComponent(val) {
    this.activeComponentObservable.next(val);
  }

  set activeComponent(module) {
      this.emitActiveComponent(module);
  }
}
