import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BkkService {

  private apiRoot = 'https://192.168.0.14:8443/api';

  constructor(private http: HttpClient) { }

  getArrivalsAndDeparturesForStop(stopId: string) {
    const query = this.apiRoot + '/departures/' + stopId;
    return this.http.get(query);
  }

  getStopsForLocation(lat: number, lon: number) {
    const query = this.apiRoot + '/stops/' + lat + '/' + lon;
    console.log(query);
    return this.http.get(query);
  }
}
