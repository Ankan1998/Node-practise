const express = require('express');

const app = express();

app.get("",(req,res)=>{
    res.send('Hello, Home Page');

})

app.get("/weather",(req,res)=>{
    res.send('Hello, Weather Page');
    
})

app.get("/about",(req,res)=>{
    res.send('Hello, About Page');
    
})

app.listen(5000,()=>{
    console.log("Server up and running at 5000")
})