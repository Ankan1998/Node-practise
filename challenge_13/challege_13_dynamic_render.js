const express = require('express');
const path = require('path');
const app = express();

// Handlebar template engine setup
app.set('view engine', 'hbs')
viewPath = path.join(__dirname,'/views')
app.set('views',viewPath)

app.use(express.static(path.join(__dirname,'/public')))

const forecast  = require('../challenge_9/challenge_9_callback_abstraction')
const k = '11820ab3394efd0ba19ca8e4ae1897cf'
forecast(-75.7088, 44.1545,k ,(error, data) => {
    console.log('Error', error);
    console.log(data); 
    app.get("/weather",(req,res)=>{
        res.render('weather',data);
        
    })      
  })

app.get("/contact",(req,res)=>{
    res.render('contact');
    
}) 

app.listen(5000,()=>{
    console.log("Server up and running at 5000")
})