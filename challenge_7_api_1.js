const request = require('postman-request');
const url = 'http://api.weatherstack.com/current?access_key=11820ab3394efd0ba19ca8e4ae1897cf&query=56.5654,-98.6757';
request({url:url,json:true}, (error,response) => {
    const curr_temp = response.body.current.temperature;
    const appr_temp = response.body.current.feelslike;
    console.log("It is " + curr_temp +", but feels like " + appr_temp);
})