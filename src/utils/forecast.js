const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const weatherstackUrl = 'http://api.weatherstack.com/current?access_key=194f69caf10b7077bfae19b6de900803&query=' + lat + ',' + long;
    request({
        url: weatherstackUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weatherstack', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else if (response.body.location) {
            callback(undefined, {
                forecast: 'high probability of rain today'
                // Name: response.body.location.name,
                // Country: response.body.location.country,
                // Region: response.body.location.region
            });
        }
    })
}

module.exports = forecast;