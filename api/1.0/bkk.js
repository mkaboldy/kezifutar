const util = require('util');
const axios = require('axios');
const apiRoot = 'https://futar.bkk.hu/api/query/v1/ws/otp/api/where';

module.exports = (router) => {

    router.get('/stops-for-location/:latlon', (req, res) => {
        const latlon = req.params.latlon.split(',');
        const endPoint = 'stops-for-location.json';
        const lat = latlon[0];
        const lon = latlon[1];
        const discoveryRadius = 0.004;
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
        axios.get(request).then(
            (apiResponse) => {
                res.json(apiResponse.data);
            },
            (error) => {
                console.error(error);
            }
        );        
    });

    return router;

};