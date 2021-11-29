const request = require('postman-request');

const forecast = (long,lat,key,callback) => {


    const url = 'http://api.weatherstack.com/current?access_key='+key+'&query=' + lat + ',' + long;
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to service!!",undefined);
        } else if (response.body.error) {
            callback("Unable to Find Location",undefined);
        } else {
            const curr_temp = response.body.current.temperature;
            const appr_temp = response.body.current.feelslike;
            callback(undefined,{curr_temp:curr_temp,appr_temp:appr_temp})
        }
    })
}

module.exports = forecast;