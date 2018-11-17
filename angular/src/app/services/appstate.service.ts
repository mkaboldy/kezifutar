import { Injectable} from '@angular/core';
import { Subject, BehaviorSubject, AsyncSubject, Observable } from 'rxjs';

@Injectable()

export class AppstateService {

  public appComponents = {
      TIMETABLE: 1,
      LOCATION: 2,
      SETTINGS: 3,
      ABOUT: 4
  };

  private _selectedStop: object;
  private _observableSelectedStopSource: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  public selectedStop$: Observable<any>; // = this._observableSelectedStopSource.asObservable();

  public observableTimeTable = new Subject();
  private _activeTimeTable: Array<object>;

  public lastPosition;

  set selectedStop(stop: object) {
    console.log('stop selected');
    this._selectedStop = stop;
    this._observableSelectedStopSource.unsubscribe();
    this._observableSelectedStopSource = new BehaviorSubject<Object>({});
    this.selectedStop$ = this._observableSelectedStopSource.asObservable();
    this._observableSelectedStopSource.next(stop);
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
