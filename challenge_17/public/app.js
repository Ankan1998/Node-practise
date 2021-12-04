console.log("Hello from browser side js");
fetch('http://api.weatherstack.com/current?access_key=11820ab3394efd0ba19ca8e4ae1897cf&query=44.1545,-75.7088')
.then((response) => {
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        } else {
            console.log({
                current_temp:data.current.temperature,
                apparent_temp:data.current.feelslike,
            })
        }
    })
})