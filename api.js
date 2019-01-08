const util = require('util');
const axios = require('axios');
const apiRoot = 'http://futar.bkk.hu/api/query/v1/ws/otp/api/where';

module.exports = (router) => {

    // TODO: /stops/lat,lon
    router.get('/stops/:lat/:lon', (req,res)=>{        
        getStopsForLatLon(req.params.lat,req.params.lon)
        .then(response =>{
            res.json(response.data);
        })
        .catch(reason => {
            console.log(reason);
        });
    });

    router.get('/departures/:stopId', (req,res)=>{
        getDepartureForStop(req.params.stopId)
        .then(response => {
            res.json(response.data);
        })
        .catch(reason => {
            console.log(reason);
        });
    });

    router.get('/departuresforstops/:stopIds', (req,res) => {
        stopIds = req.params.stopIds.split(',');
        departures = [];
        promises = [];
        stopIds.forEach(stopId => {
            promises.push(getDepartureForStop(stopId).then( response => {
                departures.push(response.data);
            }));
        });
        Promise.all(promises)
        .then( x =>{
            res.json(departures);    
        })
        .catch(reason => {
            console.log(reason);
        });
    });

    getStopsForLatLon = (lat,lon) => {
        const endPoint = 'stops-for-location.json';
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
        return axios.get(request);
    };

    getDepartureForStop = stopId => {
        const endPoint = 'arrivals-and-departures-for-stop.json';
        const request = util.format('%s/%s?%s&%s&%s&%s', 
            apiRoot, 
            endPoint,
            util.format('includeReferences=%s','agencies,routes,trips,stops'),
            util.format('stopId=%s',stopId),
            util.format('minutesBefore=%s',1),
            util.format('minutesAfter=%s',30)
        );
        return axios.get(request);
    };
    return router;
};