module.exports = (router) => {
    router.get('*', (req,res) => {
        res.json(
            [
                {
                    "version": 2,
                    "status": "OK",
                    "code": 200,
                    "text": "OK",
                    "currentTime": new Date().getTime(),
                    "data": {
                        "limitExceeded": false,
                        "entry": {
                            "stopId": "DEMO",
                            "alertIds": [],
                            "nearbyStopIds": [],
                            "stopTimes": getDemoStopTimes(demoServices),
                        },
                        "references": {
                            "agencies": {
                                "BKK": {
                                    "id": "BKK",
                                    "name": "BKK",
                                    "url": "http://www.bkk.hu",
                                    "timezone": "Europe/Budapest",
                                    "lang": "hu",
                                    "phone": "+36 1 3 255 255"
                                }
                            },
                            "routes": getDemoRoutes(demoServices),
                            "stops": {
                                "DEMO": {
                                    "id": "DEMO",
                                    "lat": 47.516092,
                                    "lon": 18.999188,
                                    "name": "LSIA Terminal 4",
                                    "code": "F00165",
                                    "direction": "-42",
                                    "locationType": 0,
                                    "parentStationId": "BKK_CSF00166",
                                    "type": "BUS",
                                    "wheelchairBoarding": true,
                                    "routeIds": [
                                        "BKK_3560",
                                        "BKK_3561",
                                        "BKK_3592",
                                        "BKK_3610"
                                    ],
                                    "stopColorType": "BUS"
                                }
                            },
                            "trips": getDemoTrips(demoServices),
                            "alerts": {}
                        },
                        "class": "entryWithReferences"
                    }
                }
            ]                    
        );
    });

    const demoServices = [
        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 1},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 4},
        {line: 3, destination: "Arena - Strawberry - South Port", schedule: 4},
        {line: 60, destination: "Downtown - Vinewood - Sisyphus Theater", schedule: 5},
        {line: 64, destination: "Morningwood - Richman - Galileo Observatory", schedule: 6},
        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 8},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 10},
        {line: 9, destination: "Vinewood Bowl (NS)", schedule: 12},
        {line: 49, destination: "Sandy Shores - Grapeseed", schedule: 14},
        {line: 7, destination: "Braddock Pass - Paleto Bay", schedule: 14},

        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 15},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 16},
        {line: 3, destination: "Arena - Strawberry - South Port", schedule: 16},
        {line: 60, destination: "Downtown - Vinewood - Sisyphus Theater", schedule: 18},
        {line: 64, destination: "Morningwood - Richman - Galileo Observatory", schedule: 20},
        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 25},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 25},
        {line: 7, destination: "Braddock Pass - Paleto Bay", schedule: 26},
        {line: 9, destination: "Vinewood Bowl (NS)", schedule: 27},
        {line: 49, destination: "Sandy Shores - Grapeseed", schedule: 29},

        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 30},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 31},
        {line: 3, destination: "Arena - Strawberry - South Port", schedule: 31},
        {line: 60, destination: "Downtown - Vinewood - Sisyphus Theater", schedule: 35},
        {line: 64, destination: "Morningwood - Richman - Galileo Observatory", schedule: 40},
        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 41},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 41},
        {line: 7, destination: "Braddock Pass - Paleto Bay", schedule: 42},
        {line: 9, destination: "Vinewood Bowl (NS)", schedule: 44},
        {line: 49, destination: "Sandy Shores - Grapeseed", schedule: 44},

        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 45},
        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 45},
        {line: 3, destination: "Arena - Strawberry - South Port", schedule: 46},
        {line: 60, destination: "Downtown - Vinewood - Sisyphus Theater", schedule: 48},
        {line: 64, destination: "Morningwood - Richman - Galileo Observatory", schedule: 50},
        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 51},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 51},
        {line: 7, destination: "Braddock Pass - Paleto Bay", schedule: 52},
        {line: 9, destination: "Vinewood Bowl (NS)", schedule: 52},
        {line: 49, destination: "Sandy Shores - Grapeseed", schedule: 59},

        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 61},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 64},
        {line: 3, destination: "Arena - Strawberry - South Port", schedule: 64},
        {line: 60, destination: "Downtown - Vinewood - Sisyphus Theater", schedule: 65},
        {line: 64, destination: "Morningwood - Richman - Galileo Observatory", schedule: 66},
        {line: 14, destination: "Del Perro - Chumash - Fort Zancudo", schedule: 68},
        {line: 10, destination: "La Puerta - Elysian Isnland - South Port", schedule: 70},
        {line: 9, destination: "Vinewood Bowl (NS)", schedule: 72},
        {line: 49, destination: "Sandy Shores - Grapeseed", schedule: 74},
        {line: 7, destination: "Braddock Pass - Paleto Bay", schedule: 74},

    ];

    function getDemoRoutes(demoServices) {
        const demoRoutes = {};
        for (const service of demoServices) {
            const id = service.line;
            demoRoutes["DEMO_"+id] = {
                id: "DEMO_"+id,
                shortName: service.line
            };
        }
        return demoRoutes;
    }

    function getDemoTrips(demoServices) {
        const demoTrips = {};
        for (const service of demoServices) {
            const id = service.line;
            demoTrips["DEMO_"+id] = {
                id: "DEMO_"+id,
                routeId: "DEMO_"+id
            };
        }
        return demoTrips;
    }

    function getDemoStopTimes(demoServices) {

        const demoStopTimes = [];

        const now = new Date();
        const thisMinute = now.getMinutes();

        var i = 0;

        for (const service of demoServices) {
            if (service.schedule >= thisMinute) {
                const departureTime = new Date();
                departureTime.setMinutes(service.schedule);
                departureTimeStamp = parseInt(departureTime.getTime() / 1000);
                demoStopTimes.push(
                    {
                        "stopHeadsign": service.destination,
                        "arrivalTime": departureTimeStamp,
                        "departureTime": departureTimeStamp,
                        "predictedArrivalTime": departureTimeStamp,
                        "predictedDepartureTime": departureTimeStamp,
                        "tripId": "DEMO_" + service.line,
                        "serviceDate": 
                            departureTime.getFullYear().toString() +
                            (departureTime.getMonth()+1).toString() + 
                            departureTime.getDate().toString()
                    }
                );
                i++;
            }

            if (i>9) {
                break;
            }
        }
        
        return demoStopTimes;
    }

    return router;

};