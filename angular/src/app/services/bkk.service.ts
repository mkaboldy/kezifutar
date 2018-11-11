import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BkkService {

  private api_root = 'http://futar.bkk.hu/api/query/v1/ws/otp/api';

  constructor(private http: HttpClient) {

  }

  getArrivalsAndDeparturesForStop(stopId: string) {
    let query = '/where/arrivals-and-departures-for-stop.json?includeReferences=agencies,routes,trips,stops&stopId=';
    query = query + 'BKK_F02398';
    query = query + '&minutesBefore=1&minutesAfter=30';

    const options = new HttpHeaders({
      'Content-Type': 'application/json', // Format set to JSON
    });

    return this.http.get(this.api_root + query);
  }

  getStopsForLocation() {
    // http://futar.bkk.hu/api/query/v1/ws/otp/api/where/stops-for-location.json?lat=47.500437128276&lon=19.072480705261&latSpan=0.005&lonSpan=0.005
    return {
        'version': 2,
        'status': 'OK',
        'code': 200,
        'text': 'OK',
        'currentTime': 1541928421352,
        'data': {
            'list': [
                {
                    'id': 'BKK_F01295',
                    'lat': 47.495504,
                    'lon': 19.07103,
                    'name': 'Blaha Lujza tér M (Népszínház utca)',
                    'code': 'F01295',
                    'direction': '-4',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_VP06',
                        'BKK_9230'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_056231',
                    'lat': 47.495593,
                    'lon': 19.077229,
                    'name': 'II. János Pál pápa tér',
                    'code': '056231',
                    'direction': '-157',
                    'locationType': 0,
                    'parentStationId': 'BKK_CS056232',
                    'type': 'SUBWAY',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_5400'
                    ],
                    'stopColorType': 'M4'
                },
                {
                    'id': 'BKK_F01298',
                    'lat': 47.495648,
                    'lon': 19.072742,
                    'name': 'Blaha Lujza tér M (Népszínház utca)',
                    'code': 'F01298',
                    'direction': '95.25163994180214',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'TRAM',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_3280',
                        'BKK_3281',
                        'BKK_3370',
                        'BKK_3371',
                        'BKK_3620'
                    ],
                    'stopColorType': 'TRAM'
                },
                {
                    'id': 'BKK_009753',
                    'lat': 47.495999,
                    'lon': 19.071283,
                    'name': 'Blaha Lujza tér M (Népszínház utca)',
                    'code': '009753',
                    'direction': '106.40175468530305',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'TRAM',
                    'wheelchairBoarding': true,
                    'routeIds': [],
                    'stopColorType': 'TRAM'
                },
                {
                    'id': 'BKK_F01299',
                    'lat': 47.495999,
                    'lon': 19.072053,
                    'name': 'Blaha Lujza tér M (Népszínház utca)',
                    'code': 'F01299',
                    'direction': '-74.94666733777109',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01297',
                    'lat': 47.496071,
                    'lon': 19.071336,
                    'name': 'Blaha Lujza tér M (Népszínház utca)',
                    'code': 'F01297',
                    'direction': '-91.71686454643317',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'TRAM',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_3040',
                        'BKK_3060'
                    ],
                    'stopColorType': 'TRAM'
                },
                {
                    'id': 'BKK_F01296',
                    'lat': 47.496089,
                    'lon': 19.071535,
                    'name': 'Blaha Lujza tér M (Népszínház utca)',
                    'code': 'F01296',
                    'direction': '-73.72909314874194',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_VP28',
                        'BKK_2175'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01294',
                    'lat': 47.49617,
                    'lon': 19.071177,
                    'name': 'Blaha Lujza tér M (Népszínház utca)',
                    'code': 'F01294',
                    'direction': '-76.61308474718348',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_0990'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01169',
                    'lat': 47.496224,
                    'lon': 19.070672,
                    'name': 'Blaha Lujza tér M',
                    'code': 'F01169',
                    'direction': '170',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'TRAM',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_3040',
                        'BKK_3060'
                    ],
                    'stopColorType': 'TRAM'
                },
                {
                    'id': 'BKK_F01293',
                    'lat': 47.496511,
                    'lon': 19.070406,
                    'name': 'Blaha Lujza tér M',
                    'code': 'F01293',
                    'direction': '83',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_VP06',
                        'BKK_9230'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01164',
                    'lat': 47.496754,
                    'lon': 19.069849,
                    'name': 'Blaha Lujza tér M',
                    'code': 'F01164',
                    'direction': '61',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_0050',
                        'BKK_0070',
                        'BKK_0075',
                        'BKK_1100',
                        'BKK_1120',
                        'BKK_1780'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_LM2BLG',
                    'lat': 47.496778,
                    'lon': 19.070266,
                    'name': 'Blaha Lujza tér [G]',
                    'code': 'LM2BLG',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_F01168',
                    'lat': 47.496781,
                    'lon': 19.070699,
                    'name': 'Blaha Lujza tér M',
                    'code': 'F01168',
                    'direction': '-6',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'TRAM',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_3040',
                        'BKK_3060'
                    ],
                    'stopColorType': 'TRAM'
                },
                {
                    'id': 'BKK_LM2BLF',
                    'lat': 47.496835,
                    'lon': 19.070577,
                    'name': 'Blaha Lujza tér [F]',
                    'code': 'LM2BLF',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_F01165',
                    'lat': 47.496853,
                    'lon': 19.070168,
                    'name': 'Blaha Lujza tér M',
                    'code': 'F01165',
                    'direction': '58',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_0085',
                        'BKK_1085',
                        'BKK_1335',
                        'BKK_9070',
                        'BKK_9080',
                        'BKK_9310',
                        'BKK_9560',
                        'BKK_9730',
                        'BKK_9900'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_LM2BLE',
                    'lat': 47.496862,
                    'lon': 19.070699,
                    'name': 'Blaha Lujza tér [E]',
                    'code': 'LM2BLE',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_LM2BLD',
                    'lat': 47.496981,
                    'lon': 19.070853,
                    'name': 'Blaha Lujza tér [D]',
                    'code': 'LM2BLD',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_LM2BL1',
                    'lat': 47.497001,
                    'lon': 19.070426,
                    'name': 'Blaha Lujza tér',
                    'code': 'LM2BL1',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_F01292',
                    'lat': 47.49701,
                    'lon': 19.070279,
                    'name': 'Blaha Lujza tér',
                    'code': 'F01292',
                    'direction': '64',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'SUBWAY',
                    'wheelchairBoarding': false,
                    'routeIds': [
                        'BKK_5200'
                    ],
                    'stopColorType': 'M2'
                },
                {
                    'id': 'BKK_LM2BLC',
                    'lat': 47.497111,
                    'lon': 19.070958,
                    'name': 'Blaha Lujza tér [C]',
                    'code': 'LM2BLC',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_LM2BLH',
                    'lat': 47.49721,
                    'lon': 19.070256,
                    'name': 'Blaha Lujza tér [H]',
                    'code': 'LM2BLH',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_LM2BLI',
                    'lat': 47.497328,
                    'lon': 19.070318,
                    'name': 'Blaha Lujza tér [I]',
                    'code': 'LM2BLI',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_LM2BLB',
                    'lat': 47.497399,
                    'lon': 19.070874,
                    'name': 'Blaha Lujza tér [B]',
                    'code': 'LM2BLB',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_LM2BLA',
                    'lat': 47.497462,
                    'lon': 19.070723,
                    'name': 'Blaha Lujza tér [A]',
                    'code': 'LM2BLA',
                    'direction': '',
                    'locationType': 2,
                    'parentStationId': 'BKK_CSF01116',
                    'wheelchairBoarding': false,
                    'routeIds': [],
                    'stopColorType': 'ENTRANCE'
                },
                {
                    'id': 'BKK_F01166',
                    'lat': 47.497519,
                    'lon': 19.071508,
                    'name': 'Blaha Lujza tér M',
                    'code': 'F01166',
                    'direction': '-113',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_0050',
                        'BKK_0070',
                        'BKK_0075',
                        'BKK_0085',
                        'BKK_1085',
                        'BKK_1100',
                        'BKK_1120',
                        'BKK_1335',
                        'BKK_1780',
                        'BKK_9070',
                        'BKK_9080',
                        'BKK_9310',
                        'BKK_9560',
                        'BKK_9730',
                        'BKK_9900'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01167',
                    'lat': 47.497618,
                    'lon': 19.070619,
                    'name': 'Blaha Lujza tér M',
                    'code': 'F01167',
                    'direction': '-10',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_VP06',
                        'BKK_9230'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01291',
                    'lat': 47.496643,
                    'lon': 19.068847,
                    'name': 'Blaha Lujza tér',
                    'code': 'F01291',
                    'direction': '-112',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'SUBWAY',
                    'wheelchairBoarding': false,
                    'routeIds': [
                        'BKK_5200'
                    ],
                    'stopColorType': 'M2'
                },
                {
                    'id': 'BKK_008782',
                    'lat': 47.496844,
                    'lon': 19.069066,
                    'name': 'Blaha Lujza tér M',
                    'code': '008782',
                    'direction': '-122.85849250812757',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_0075'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01112',
                    'lat': 47.49983,
                    'lon': 19.06916,
                    'name': 'Wesselényi utca / Erzsébet körút',
                    'code': 'F01112',
                    'direction': '153',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01115',
                    'type': 'TRAM',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_3040',
                        'BKK_3060'
                    ],
                    'stopColorType': 'TRAM'
                },
                {
                    'id': 'BKK_F01114',
                    'lat': 47.500046,
                    'lon': 19.068895,
                    'name': 'Wesselényi utca / Erzsébet körút',
                    'code': 'F01114',
                    'direction': '156',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01115',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_VP06',
                        'BKK_9230'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01113',
                    'lat': 47.50019,
                    'lon': 19.06916,
                    'name': 'Wesselényi utca / Erzsébet körút',
                    'code': 'F01113',
                    'direction': '-21',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01115',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_VP06',
                        'BKK_9230'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01111',
                    'lat': 47.500325,
                    'lon': 19.068948,
                    'name': 'Wesselényi utca / Erzsébet körút',
                    'code': 'F01111',
                    'direction': '-24',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01115',
                    'type': 'TRAM',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_3040',
                        'BKK_3060'
                    ],
                    'stopColorType': 'TRAM'
                },
                {
                    'id': 'BKK_F01115',
                    'lat': 47.500928,
                    'lon': 19.069307,
                    'name': 'Wesselényi utca / Erzsébet körút',
                    'code': 'F01115',
                    'direction': '-127',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01115',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4740'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01163',
                    'lat': 47.497662,
                    'lon': 19.073991,
                    'name': 'Kiss József utca',
                    'code': 'F01163',
                    'direction': '160',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01163',
                    'type': 'BUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_0990'
                    ],
                    'stopColorType': 'BUS'
                },
                {
                    'id': 'BKK_F01116',
                    'lat': 47.498319,
                    'lon': 19.069664,
                    'name': 'Blaha Lujza tér M',
                    'code': 'F01116',
                    'direction': '37',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01116',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4740'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01173',
                    'lat': 47.500288,
                    'lon': 19.072996,
                    'name': 'Szövetség utca',
                    'code': 'F01173',
                    'direction': '40',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01173',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4740'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_062517',
                    'lat': 47.501817,
                    'lon': 19.075598,
                    'name': 'Rózsák tere',
                    'code': '062517',
                    'direction': '45',
                    'locationType': 0,
                    'parentStationId': 'BKK_CS062517',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4730',
                        'BKK_4740',
                        'BKK_4760'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01118',
                    'lat': 47.502546,
                    'lon': 19.072161,
                    'name': 'Almássy tér',
                    'code': 'F01118',
                    'direction': '-132',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01118',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4740'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01117',
                    'lat': 47.502825,
                    'lon': 19.073555,
                    'name': 'Wesselényi utca / Izabella utca',
                    'code': 'F01117',
                    'direction': '138',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01117',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4730',
                        'BKK_4760'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01122',
                    'lat': 47.50304,
                    'lon': 19.076581,
                    'name': 'Rottenbiller utca / István utca',
                    'code': 'F01122',
                    'direction': '-31',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01122',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4730',
                        'BKK_4760'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01120',
                    'lat': 47.503733,
                    'lon': 19.074444,
                    'name': 'Rózsa utca',
                    'code': 'F01120',
                    'direction': '-113',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01120',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4730',
                        'BKK_4740',
                        'BKK_4760'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01119',
                    'lat': 47.503877,
                    'lon': 19.072507,
                    'name': 'Dob utca',
                    'code': 'F01119',
                    'direction': '-36',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01119',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4730',
                        'BKK_4760'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01121',
                    'lat': 47.502824,
                    'lon': 19.077404,
                    'name': 'Rottenbiller utca / István utca',
                    'code': 'F01121',
                    'direction': '54',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01122',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4740',
                        'BKK_4790'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01043',
                    'lat': 47.505236,
                    'lon': 19.06903,
                    'name': 'Izabella utca / Király utca',
                    'code': 'F01043',
                    'direction': '48',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01042',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4700',
                        'BKK_4780'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                },
                {
                    'id': 'BKK_F01041',
                    'lat': 47.505425,
                    'lon': 19.069083,
                    'name': 'Izabella utca / Király utca',
                    'code': 'F01041',
                    'direction': '-128',
                    'locationType': 0,
                    'parentStationId': 'BKK_CSF01042',
                    'type': 'TROLLEYBUS',
                    'wheelchairBoarding': true,
                    'routeIds': [
                        'BKK_4700',
                        'BKK_4780'
                    ],
                    'stopColorType': 'TROLLEYBUS'
                }
            ],
            'outOfRange': false,
            'limitExceeded': false,
            'references': {
                'agencies': {
                    'BKK': {
                        'id': 'BKK',
                        'name': 'BKK',
                        'url': 'http://www.bkk.hu',
                        'timezone': 'Europe/Budapest',
                        'lang': 'hu',
                        'phone': '+36 1 3 255 255'
                    }
                },
                'routes': {
                    'BKK_9560': {
                        'id': 'BKK_9560',
                        'shortName': '956',
                        'longName': null,
                        'description': 'Pécel, Kun József utca | Pesthidegkút-Hűvösvölgy',
                        'type': 'BUS',
                        'url': null,
                        'color': '1E1E1E',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '956',
                        'bikesAllowed': false
                    },
                    'BKK_9900': {
                        'id': 'BKK_9900',
                        'shortName': '990',
                        'longName': null,
                        'description': 'Rákoskert | Normafa',
                        'type': 'BUS',
                        'url': null,
                        'color': '1E1E1E',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '990',
                        'bikesAllowed': false
                    },
                    'BKK_1335': {
                        'id': 'BKK_1335',
                        'shortName': '133E',
                        'longName': null,
                        'description': 'Nagytétény, Erdélyi utca | Újpalota, Nyírpalota út',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '133E',
                        'bikesAllowed': false
                    },
                    'BKK_4700': {
                        'id': 'BKK_4700',
                        'shortName': '70',
                        'longName': null,
                        'description': 'Erzsébet k.né útja, alulj. | Kossuth Lajos tér M',
                        'type': 'TROLLEYBUS',
                        'url': null,
                        'color': 'FF1609',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '70',
                        'bikesAllowed': false
                    },
                    'BKK_0990': {
                        'id': 'BKK_0990',
                        'shortName': '99',
                        'longName': null,
                        'description': 'Mátyás király tér | Blaha Lujza tér M',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '99',
                        'bikesAllowed': false
                    },
                    'BKK_3620': {
                        'id': 'BKK_3620',
                        'shortName': '62',
                        'longName': null,
                        'description': 'Rákospalota, MÁV-telep | Blaha Lujza tér M',
                        'type': 'TRAM',
                        'url': null,
                        'color': 'FFD800',
                        'textColor': '000000',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '62',
                        'bikesAllowed': false
                    },
                    'BKK_4730': {
                        'id': 'BKK_4730',
                        'shortName': '73',
                        'longName': null,
                        'description': 'Keleti pályaudvar M | Arany János utca M',
                        'type': 'TROLLEYBUS',
                        'url': null,
                        'color': 'FF1609',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '73',
                        'bikesAllowed': false
                    },
                    'BKK_5400': {
                        'id': 'BKK_5400',
                        'shortName': 'M4',
                        'longName': null,
                        'description': 'Kelenföld vasútállomás | Keleti pályaudvar',
                        'type': 'SUBWAY',
                        'url': null,
                        'color': '4CA22F',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'CIRCLE',
                        'iconDisplayText': '4',
                        'bikesAllowed': false
                    },
                    'BKK_1100': {
                        'id': 'BKK_1100',
                        'shortName': '110',
                        'longName': null,
                        'description': 'Bosnyák tér | Thomán István utca',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '110',
                        'bikesAllowed': false
                    },
                    'BKK_2175': {
                        'id': 'BKK_2175',
                        'shortName': '217E',
                        'longName': null,
                        'description': 'Pestszentlőrinc, Szarvas csárda tér | Blaha Lujza tér M',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '217E',
                        'bikesAllowed': false
                    },
                    'BKK_1120': {
                        'id': 'BKK_1120',
                        'shortName': '112',
                        'longName': null,
                        'description': 'Bosnyák tér | Thomán István utca',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '112',
                        'bikesAllowed': false
                    },
                    'BKK_1780': {
                        'id': 'BKK_1780',
                        'shortName': '178',
                        'longName': null,
                        'description': 'Keleti pályaudvar M | Naphegy tér',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '178',
                        'bikesAllowed': false
                    },
                    'BKK_0050': {
                        'id': 'BKK_0050',
                        'shortName': '5',
                        'longName': null,
                        'description': 'Rákospalota, Kossuth utca | Pasaréti tér',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '5',
                        'bikesAllowed': false
                    },
                    'BKK_5200': {
                        'id': 'BKK_5200',
                        'shortName': 'M2',
                        'longName': null,
                        'description': 'Örs vezér tere M+H | Déli pályaudvar M',
                        'type': 'SUBWAY',
                        'url': null,
                        'color': 'E41F18',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'CIRCLE',
                        'iconDisplayText': '2',
                        'bikesAllowed': false
                    },
                    'BKK_0075': {
                        'id': 'BKK_0075',
                        'shortName': '7E',
                        'longName': null,
                        'description': 'Újpalota, Nyírpalota út | Blaha Lujza tér M',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '7E',
                        'bikesAllowed': false
                    },
                    'BKK_1085': {
                        'id': 'BKK_1085',
                        'shortName': '108E',
                        'longName': null,
                        'description': 'Újpalota, Nyírpalota út | Gazdagréti tér',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '108E',
                        'bikesAllowed': false
                    },
                    'BKK_4790': {
                        'id': 'BKK_4790',
                        'shortName': '79',
                        'longName': null,
                        'description': 'Kárpát utca | Keleti pályaudvar M',
                        'type': 'TROLLEYBUS',
                        'url': null,
                        'color': 'FF1609',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '79',
                        'bikesAllowed': false
                    },
                    'BKK_3040': {
                        'id': 'BKK_3040',
                        'shortName': '4',
                        'longName': null,
                        'description': 'Újbuda-központ M | Széll Kálmán tér M',
                        'type': 'TRAM',
                        'url': null,
                        'color': 'FFD800',
                        'textColor': '000000',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '4',
                        'bikesAllowed': false
                    },
                    'BKK_3281': {
                        'id': 'BKK_3281',
                        'shortName': '28A',
                        'longName': null,
                        'description': 'Új köztemető (Kozma u.) | Orczy tér',
                        'type': 'TRAM',
                        'url': null,
                        'color': 'FFD800',
                        'textColor': '000000',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '28A',
                        'bikesAllowed': false
                    },
                    'BKK_3280': {
                        'id': 'BKK_3280',
                        'shortName': '28',
                        'longName': null,
                        'description': 'Izraelita temető | Orczy tér',
                        'type': 'TRAM',
                        'url': null,
                        'color': 'FFD800',
                        'textColor': '000000',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '28',
                        'bikesAllowed': false
                    },
                    'BKK_3060': {
                        'id': 'BKK_3060',
                        'shortName': '6',
                        'longName': null,
                        'description': 'Móricz Zs. körtér M | Széll Kálmán tér M',
                        'type': 'TRAM',
                        'url': null,
                        'color': 'FFD800',
                        'textColor': '000000',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '6',
                        'bikesAllowed': false
                    },
                    'BKK_0070': {
                        'id': 'BKK_0070',
                        'shortName': '7',
                        'longName': null,
                        'description': 'Újpalota, Nyírpalota út | Albertfalva vasútállomás',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '7',
                        'bikesAllowed': false
                    },
                    'BKK_9080': {
                        'id': 'BKK_9080',
                        'shortName': '908',
                        'longName': null,
                        'description': 'Cinkotai autóbuszgarázs | Móricz Zs. körtér M',
                        'type': 'BUS',
                        'url': null,
                        'color': '1E1E1E',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '908',
                        'bikesAllowed': false
                    },
                    'BKK_VP06': {
                        'id': 'BKK_VP06',
                        'shortName': '6',
                        'longName': null,
                        'description': 'Széll Kálmán tér M | Móricz Zs. körtér M',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '6',
                        'bikesAllowed': false
                    },
                    'BKK_9230': {
                        'id': 'BKK_9230',
                        'shortName': '923',
                        'longName': null,
                        'description': 'Dél-pesti autóbuszgarázs | Békásmegyer H',
                        'type': 'BUS',
                        'url': null,
                        'color': '1E1E1E',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '923',
                        'bikesAllowed': false
                    },
                    'BKK_VP28': {
                        'id': 'BKK_VP28',
                        'shortName': '28',
                        'longName': null,
                        'description': 'Orczy tér | Blaha Lujza tér M',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '28',
                        'bikesAllowed': false
                    },
                    'BKK_9310': {
                        'id': 'BKK_9310',
                        'shortName': '931',
                        'longName': null,
                        'description': 'Árpádföld, Dezsőfia utca | Verecke lépcső',
                        'type': 'BUS',
                        'url': null,
                        'color': '1E1E1E',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '931',
                        'bikesAllowed': false
                    },
                    'BKK_9730': {
                        'id': 'BKK_9730',
                        'shortName': '973',
                        'longName': null,
                        'description': 'Nagytétény, ipartelep | Újpalota, Szentmihályi út',
                        'type': 'BUS',
                        'url': null,
                        'color': '1E1E1E',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '973',
                        'bikesAllowed': false
                    },
                    'BKK_4740': {
                        'id': 'BKK_4740',
                        'shortName': '74',
                        'longName': null,
                        'description': 'Csáktornya park | Károly körút (Astoria M)',
                        'type': 'TROLLEYBUS',
                        'url': null,
                        'color': 'FF1609',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '74',
                        'bikesAllowed': false
                    },
                    'BKK_4760': {
                        'id': 'BKK_4760',
                        'shortName': '76',
                        'longName': null,
                        'description': 'Keleti pályaudvar M | Jászai Mari tér',
                        'type': 'TROLLEYBUS',
                        'url': null,
                        'color': 'FF1609',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '76',
                        'bikesAllowed': false
                    },
                    'BKK_0085': {
                        'id': 'BKK_0085',
                        'shortName': '8E',
                        'longName': null,
                        'description': 'Újpalota, Nyírpalota út | Kelenföld vasútállomás M',
                        'type': 'BUS',
                        'url': null,
                        'color': '009FE3',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '8E',
                        'bikesAllowed': false
                    },
                    'BKK_4780': {
                        'id': 'BKK_4780',
                        'shortName': '78',
                        'longName': null,
                        'description': 'Keleti pu. M (Garay utca) | Kossuth Lajos tér M',
                        'type': 'TROLLEYBUS',
                        'url': null,
                        'color': 'FF1609',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '78',
                        'bikesAllowed': false
                    },
                    'BKK_3371': {
                        'id': 'BKK_3371',
                        'shortName': '37A',
                        'longName': null,
                        'description': 'Sörgyár | Magdolna utca',
                        'type': 'TRAM',
                        'url': null,
                        'color': 'FFD800',
                        'textColor': '000000',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '37A',
                        'bikesAllowed': false
                    },
                    'BKK_3370': {
                        'id': 'BKK_3370',
                        'shortName': '37',
                        'longName': null,
                        'description': 'Új köztemető (Kozma utca) | Blaha Lujza tér M',
                        'type': 'TRAM',
                        'url': null,
                        'color': 'FFD800',
                        'textColor': '000000',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '37',
                        'bikesAllowed': false
                    },
                    'BKK_9070': {
                        'id': 'BKK_9070',
                        'shortName': '907',
                        'longName': null,
                        'description': 'Örs vezér tere M H | Kelenföld vasútállomás M',
                        'type': 'BUS',
                        'url': null,
                        'color': '1E1E1E',
                        'textColor': 'FFFFFF',
                        'agencyId': 'BKK',
                        'iconDisplayType': 'BOX',
                        'iconDisplayText': '907',
                        'bikesAllowed': false
                    }
                },
                'stops': {},
                'trips': {},
                'alerts': {}
            },
            'class': 'listWithReferences'
        }
    };
  }
}
