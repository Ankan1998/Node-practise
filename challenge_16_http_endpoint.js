const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'/public')))

const forecast  = require('./challenge_9/challenge_9_callback_abstraction')
const k = '11820ab3394efd0ba19ca8e4ae1897cf'


  app.get("/",(req,res)=>{
    res.send("Homepage");
    
}) 

app.get("/weather",(req,res)=>{
    if(!req.query.long || !req.query.lat){
        return res.send({error:"Error fetching"})
    }
    forecast(req.query.long, req.query.lat,k ,(error, {curr_temp,appr_temp}) => {
        if (error){
            return res.send({apiError: "Something went wrong"})
        }
        res.send({
            Current: curr_temp,
            Apparent:appr_temp
        })      
      })
    
}) 
 

app.listen(5000,()=>{
    console.log("Server up and running at 5000")
})