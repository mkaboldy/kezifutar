import { Injectable} from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()

export class AppstateService {

  public appComponents = {
      TIMETABLE: 1,
      LOCATION: 2,
      SETTINGS: 3,
      ABOUT: 4
  };

  public activeComponent: number;

  private _selectedStop: object;
  private _observableSelectedStopSource = new BehaviorSubject<Object>({});
  public selectedStop$ = this._observableSelectedStopSource.asObservable();

  public observableTimeTable = new Subject();
  private _activeTimeTable: Array<object>;

  set selectedStop(stop: object) {
    console.log('stop selected');
    this._selectedStop = stop;
    this._observableSelectedStopSource.next(this._selectedStop);
  }

  get selectedStop() {
    return this._selectedStop;
  }

  set activeTimeTable(timeTable: Array<object>) {
    this._activeTimeTable = timeTable;
    this.observableTimeTable.next(this._activeTimeTable);
  }

  get activeTimeTable() {
    return this._activeTimeTable;
  }
}
