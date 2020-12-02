const request = require('request');
const api_key = require('./api-key.js');

const forecast = (lat, long, unit, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=${unit}`
    
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        } else if(body.error){
            if(body.error.type === 'invalid_access_key'){
                return callback("You have provided an invalid API key (src/utils/api-key.js)", undefined);
            }
            console.log(body.error)
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}(${unit === 'm' ? 'C' : 'F'}) degrees, it feels like ${body.current.feelslike}(${unit === 'm' ? 'C' : 'F'}) degrees. The humidity is ${body.current.humidity}%.`);
        }
    });
}

module.exports = forecast;