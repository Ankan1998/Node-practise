console.log("Hello from browser side js");
const config = {
    api_key : ''
}

const weatherform = document.querySelector('form')
const long = document.querySelector('input.long')
const lat = document.querySelector('input.lat')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch('http://api.weatherstack.com/current?access_key='+config.api_key+'&query=' + lat.value + ',' + long.value)
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
})

