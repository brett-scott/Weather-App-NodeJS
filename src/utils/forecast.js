const request = require('request');

const forecast = (lat, long, unit, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=28c0da2f6eb7c299937d75544c9265e0&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=${unit}`
    
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}(${unit === 'm' ? 'C' : 'F'}) degrees, it feels like ${body.current.feelslike}(${unit === 'm' ? 'C' : 'F'}) degrees. The humidity is ${body.current.humidity}%.`);
        }
    });
}

module.exports = forecast;