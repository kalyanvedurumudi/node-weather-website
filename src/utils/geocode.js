const request = require('postman-request');

const geocode = (address, callback) => {
    const map_base_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3ZlZHVydW11ZGkiLCJhIjoiY2tkOGZhazl5MGY3czJzazZzaGJ5ZzNzeiJ9.hrogNvESOenX14anf47Fjg&cachebuster=1596091165967&autocomplete=true';
    request({
        url: map_base_url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to mapbox', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another serch', undefined);
        } else if (response.body) {
            callback(undefined, {
                lat: response.body.features[0].center[0],
                lon: response.body.features[0].center[1],
                location: response.body.features[0].place_name 
            });
        }
    })
}

module.exports = geocode;