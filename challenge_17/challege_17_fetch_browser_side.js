const express = require('express');
const path = require('path');
const app = express();

// Handlebar template engine setup
app.set('view engine', 'hbs')
viewPath = path.join(__dirname,'/views')
app.set('views',viewPath)

app.use(express.static(path.join(__dirname,'/public')))


app.get("/contact",(req,res)=>{
    res.render('contact');
    
}) 

app.get("/weather",(req,res)=>{
    res.render('weather');
    
}) 
app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(5000,()=>{
    console.log("Server up and running at 5000")
})