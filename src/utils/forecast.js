const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=809cbb7c963feb45712a47e4da182860';

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Can not establish connection with weather service', undefined)
        } else if(body.message) {
            callback('Provided location is invalid. Try another one', undefined)
        } else {
            callback(undefined, ('It is currently ' + body.main.temp + ' out . Probability of ' + body.weather[0].description))
        }
        })
}


module.exports = forecast;