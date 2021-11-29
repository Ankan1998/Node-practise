const express = require('express');

const app = express();

const forecast  = require('./challenge_9/challenge_9_callback_abstraction')
const k = ''
forecast(-75.7088, 44.1545,k ,(error, data) => {
    console.log('Error', error);
    console.log(data); 
    app.get("/weather",(req,res)=>{
        res.send(data);
        
    })      
  })



app.get("/about",(req,res)=>{
    res.send('<h1>About Us</h1>');
    
})

app.listen(5000,()=>{
    console.log("Server up and running at 5000")
})