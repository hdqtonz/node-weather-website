const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiaGl0ZW5xdG9ueiIsImEiOiJjbDBzMGs4enAwOHQ0M2VvcGRtYmtrZGFmIn0.QGl4E1MVlpf-OuPbjrPPPA&limit=1'

    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to Connect to loaction services',undefined)
        } else if (body.features.length === 0) {
            callback('Unable to finde loaction. Try another search',undefined)
        } else {
            callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
            })
        }
    }) 
}

module.exports = geocode