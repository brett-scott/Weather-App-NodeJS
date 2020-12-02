const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=28c0da2f6eb7c299937d75544c9265e0&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=m`
    
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            // callback(undefined, {
            //     description: body.current.weather_descriptions[0],
            //     temperature: body.current.temperature,
            //     feelslike: body.current.feelslike
            // });
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}(C) degrees, it feels like ${body.current.feelslike}(C) degrees. The humidity is ${body.current.humidity}%.`);
        }
    });
}

module.exports = forecast;