const request = require('postman-request');

const forecast = (long,lat,key) => {
    return new Promise((resolve,reject)=>{
        const url = 'http://api.weatherstack.com/current?access_key='+key+'&query=' + lat + ',' + long;
        request({
            url: url,
            json: true
        }, (error, response) => {
            if (error) {
                reject("Unable to connect to service!!");
            } else if (response.body.error) {
                reject("Unable to Find Location");
            } else {
                const curr_temp = response.body.current.temperature;
                const appr_temp = response.body.current.feelslike;
                resolve({curr_temp:curr_temp,appr_temp:appr_temp})
            }
        })
    })


}

const key = ''

forecast(-75.7088, 44.1545,key).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})