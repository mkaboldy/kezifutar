import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BkkService {

  private apiRoot: string = environment.api_root;

  constructor(private http: HttpClient) { }

  getStationsForLocation(lat: number, lon: number): Observable<any> {
    const query = this.apiRoot + '/bkk/stations-for-location/' + lat + ',' + lon;
    return this.http.get(query);
  }

  getDeparturesForStos(stops: Array<string>): Observable<any> {
    const query = this.apiRoot + '/bkk/departures-for-stops/' + stops.join(',');
    return this.http.get(query);
  }
}
