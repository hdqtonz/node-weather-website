const request = require('request')

const forecast = (leti,longi, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7b1ee6ff21e39a440ff90cfd5e40c1c0&query='+leti+','+longi+''

    request({url, json:true}, (err, { body }) => {
        if(err){
            callback('Chack you connection plz', undefined)
        } else if(body.error) {
            callback('Plz Provaide valide address', undefined)
        }else{
            callback(undefined, {
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })

}

module.exports = forecast