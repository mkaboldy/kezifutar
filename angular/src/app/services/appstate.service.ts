import { Injectable} from '@angular/core';

@Injectable()

export class AppstateService {

  public selectedStop: object;

  public lastPosition: Position;

  constructor () {
    this.selectedStop = {
      id: '',
      name: ''
    };
  }
}
