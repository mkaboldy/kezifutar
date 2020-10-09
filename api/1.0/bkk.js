const util = require('util');
const axios = require('axios').default;
const apiRoot = 'https://futar.bkk.hu/api/query/v1/ws/otp/api/where';

module.exports = (router) => {

    router.get('/stations-for-location/:latlon', (req, res) => {
        const latlon = req.params.latlon.split(',');
        const endPoint = 'stops-for-location.json';
        const lat = latlon[0];
        const lon = latlon[1];
        const discoveryRadius = 0.005;
        const latSpan = discoveryRadius;
        const lonSpan = discoveryRadius;
        const request = util.format('%s/%s?%s&%s&%s&%s', 
            apiRoot, 
            endPoint,
            util.format('lat=%s',lat),
            util.format('lon=%s',lon),
            util.format('latSpan=%s',latSpan),
            util.format('lonSpan=%s',lonSpan)
        );
        axios.get(request)
        .then(
            (apiResponse) => {
                processedResponse = apiResponse.data;
                processedResponse.stations = [];
                processedResponse.data.list.forEach((item) => {
                        if(item.locationSubType === 'stops') {
                            station = {
                                'ID': item.id, 
                                'name': item.name,
                                'stops': [],
                                'vehicleTypes': {
                                    'bus': false,
                                    'tram': false,
                                    'trolleybus': false,
                                    'rail': false,
                                    'subway': false,
                                  },                            
                            };
                            processedResponse.data.list.forEach((stop)=>{
                                if (stop.parentStationId === station.ID) {
                                    if (stop.stopColorType && stop.stopColorType.indexOf('TRAM') !== -1) { station.vehicleTypes.tram = true;}
                                    if (stop.stopColorType && stop.stopColorType.indexOf('BUS') !== -1) { station.vehicleTypes.bus = true;}
                                    if (stop.stopColorType && stop.stopColorType.indexOf('TROLLEYBUS') !== -1) { station.vehicleTypes.trolleybus = true;}
                                    if (stop.type && stop.type.indexOf('RAIL') !== -1) { station.vehicleTypes.rail = true;}
                                    if (stop.type && stop.type.indexOf('SUBWAY') !== -1) { station.vehicleTypes.subway = true;}

                                    station.stops.push(stop);
                                }
                            });
                            processedResponse.stations.push(station);
                        }
                    }
                );
                res.json(apiResponse.data);
            }
        ).catch(error=> {
            if (error.response) {
                // client received an error response (5xx, 4xx)
                res.status(error.response.status).send(error.response.data);
                console.error(error.response.data);
            } else if (error.request) {
                // client never received a response, or request never left
                res.status(503).send(error.request.data);
                console.error(error.request.data);
            } else {
                res.status(500).send('unable to serve the request');
                console.error(error);
                // anything else
            }            
        });        
    });

    router.get('/departures-for-stops/:stops', (req, res) => {
        const stops = req.params.stops.split(',');
        const endPoint = 'arrivals-and-departures-for-stop.json';
        var requests = [];
        var apiResponses = [];
        stops.forEach((stop)=>{
            const request = util.format('%s/%s?%s&%s&%s&%s', 
                apiRoot, 
                endPoint,
                util.format('includeReferences=%s','agencies,routes,trips,stops'),
                util.format('stopId=%s',stop),
                util.format('minutesBefore=%s',1),
                util.format('minutesAfter=%s',30)
            );
            requests.push(axios.get(request));
        });

        axios.all(requests)
            .then(axios.spread((...responses) => {
                responses.forEach(response=>{
                    apiResponses.push(response.data);
                });
                const response = {
                    stations: {},
                    
                };
                // prepare stations in case multiple departure boards will be needed
                apiResponses.forEach(apiResponse => {
                    const stopReferences = apiResponse.data.references.stops;
                    Object.keys(stopReferences).forEach((stop)=>{
                        const parentStationId = stopReferences[stop].parentStationId;
                        const parentStation = {
                            ID: parentStationId,
                            name: stopReferences[stop].name,
                            departures: [],
                        };
                        response.stations[parentStationId] = parentStation;
                    });
                });
                // add departures to the station departure boards
                apiResponses.forEach(apiResponse => {
                    apiResponse.data.entry.stopTimes.forEach(stopTime => {
                        const parentStationId = apiResponse.data.references.stops[apiResponse.data.entry.stopId].parentStationId;
                        const trip = apiResponse.data.references.trips[stopTime.tripId]; 
                        const route = apiResponse.data.references.routes[trip.routeId];
                        const vehicleType = route.type;
                        const line = route.shortName;
                        const lineDescription = route.description;
                        const currentTime = new Date(apiResponse.currentTime);
                        const departureTime = new Date(stopTime.predictedDepartureTime ? stopTime.predictedDepartureTime * 1000 : stopTime.departureTime * 1000);
                        const departureMins = Math.ceil( (departureTime.getTime() - currentTime.getTime()) / (60 * 1000));
                        const departure = {
                            line: line,
                            lineDescription: lineDescription,
                            vehicleType: vehicleType,
                            destination: stopTime.stopHeadsign,
                            departureMins: departureMins,
                        };
                        response.stations[parentStationId].departures.push(departure);
                    });
                });
                // reorder departure boards by departure mins
                Object.values(response.stations).forEach(station=>{
                    station.departures.sort((a, b) => a.departureMins > b.departureMins ? 1 : -1);
                });
                res.json(response);
            }))
            .catch(error => {
                if (error.response) {
                    // client received an error response (5xx, 4xx)
                    res.status(error.response.status).send(error.response.data);
                    console.error(error.response.data);
                } else if (error.request) {
                    // client never received a response, or request never left
                    res.status(503).send(error.request.data);
                    console.error(error.request.data);
                } else {
                    res.status(500).send('unable to serve the request');
                    console.error(error);
                    // anything else
                }            
            });
    });

    return router;

};