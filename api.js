const http = require('http');
const util = require('util');
const apiRoot = 'http://futar.bkk.hu/api/query/v1/ws/otp/api/where';

module.exports = (router) => {

    router.get('/stops/:lat/:lon', (req,res)=>{
        const endPoint = 'stops-for-location.json';
        const lat = req.params.lat; // 47.500437128276;
        const lon = req.params.lon; // 19.072480705261;
        const latSpan = 0.005;
        const lonSpan = 0.005;
        const request = util.format('%s/%s?%s&%s&%s&%s', 
            apiRoot, 
            endPoint,
            util.format('lat=%s',lat),
            util.format('lon=%s',lon),
            util.format('latSpan=%s',latSpan),
            util.format('lonSpan=%s',lonSpan)
        );
        http.get(request, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                res.json(JSON.parse(data));
            });          
        }).on("error", (err) => {
            res.json(err)
        });                
    });

    router.get('/departures/:stopId', (req,res)=>{
        const endPoint = 'arrivals-and-departures-for-stop.json';
        const request = util.format('%s/%s?%s&%s&%s&%s', 
            apiRoot, 
            endPoint,
            util.format('includeReferences=%s','agencies,routes,trips,stops'),
            util.format('stopId=%s',req.params.stopId),
            util.format('minutesBefore=%s',1),
            util.format('minutesAfter=%s',30)
        );
        http.get(request, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                res.json(JSON.parse(data));
            });          
        }).on("error", (err) => {
            res.json(err)
        });                
    });

    return router;
}