const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoibmlraGlsMzIzIiwiYSI6ImNrYmZjOWM2bzB1OTUycm81OW93ajMzaHoifQ.42sOqXHCaOyKXObq6mqFCw&limit=1'

    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Can not establish connection with weather server', undefined);
        } else if(body.features.length === 0) {
            callback('Please provide proper address, with more(specific) details', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}



module.exports = geoCode;
