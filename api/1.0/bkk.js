const util = require('util');
const axios = require('axios');
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

    return router;

};