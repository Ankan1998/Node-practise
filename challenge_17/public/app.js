console.log("Hello from browser side js");
const config = {
    api_key : ''
}

const weatherform = document.querySelector('form')
const long = document.querySelector('input.long')
const lat = document.querySelector('input.lat')
const result = document.querySelector('p.result')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch('http://api.weatherstack.com/current?access_key='+config.api_key+'&query=' + lat.value + ',' + long.value)
    .then((response) => {
        response.json().then((data)=>{
            if(data.error){
                result.innerHTML = "Error "+ data.error
            } else {
                
                    result.innerHTML = "Current Temperature: "+ data.current.temperature
                    + "; Apparent temperature: " + data.current.feelslike ;
                    
            }
        })
    })
})

