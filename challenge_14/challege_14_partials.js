const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs')

// Handlebar template engine setup
app.set('view engine', 'hbs')
viewPath = path.join(__dirname,'/views')
app.set('views',viewPath)
partialPath = path.join(__dirname,'/partials')
hbs.registerPartials(partialPath)

app.use(express.static(path.join(__dirname,'/public')))

const forecast  = require('../challenge_9/challenge_9_callback_abstraction')
const k = ''
forecast(-75.7088, 44.1545,k ,(error, data) => {
    console.log('Error', error);
    console.log(data);
    if (data){
        data.title = "Weather"
    }
     
    app.get("/weather",(req,res)=>{
        res.render('weather',data);
        
    })      
  })

  app.get("/",(req,res)=>{
    res.render('',{title:"Homepage"});
    
}) 

app.get("/contact",(req,res)=>{
    res.render('contact',{title:"Contact"});
    
}) 

app.listen(5000,()=>{
    console.log("Server up and running at 5000")
})