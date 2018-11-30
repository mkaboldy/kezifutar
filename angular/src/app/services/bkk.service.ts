import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BkkService {

  private apiRoot = environment.api_root;

  constructor(private http: HttpClient) { }

  getArrivalsAndDeparturesForStop(stopId: string) {
    // const query = this.apiRoot + '/departures/' + stopId; /** legacy api */
    const query = this.apiRoot + '/departuresforstops/' + stopId;
    return this.http.get(query);
  }

  getStopsForLocation(lat: number, lon: number) {
    const query = this.apiRoot + '/stops/' + lat + '/' + lon;
    return this.http.get(query);
  }
}
